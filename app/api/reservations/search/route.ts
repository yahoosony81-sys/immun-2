import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID || "";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.NOTION_API_KEY || !DATABASE_ID) {
      return NextResponse.json(
        { error: "Notion API 키 또는 데이터베이스 ID가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const { name, phone } = await request.json();

    // 전화번호에서 하이픈 제거 (DB에 하이픈 없이 저장된 경우 대비)
    const cleanPhone = phone.replace(/-/g, "");

    // 노션 데이터베이스에서 이름과 전화번호로 검색
    const response = await (notion.databases as any).query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: "이름",
            title: {
              equals: name,
            },
          },
          {
            or: [
              {
                property: "전화번호",
                phone_number: {
                  equals: phone, // 입력된 그대로 검색 (하이픈 포함 가능)
                },
              },
              {
                property: "전화번호",
                phone_number: {
                  equals: cleanPhone, // 하이픈 제거하고 검색
                },
              },
            ],
          },
        ],
      },
    });

    if (response.results.length === 0) {
      return NextResponse.json({ reservation: null });
    }

    const page = response.results[0] as any;
    const properties = page.properties;

    const reservation = {
      id: page.id,
      name: properties["이름"]?.title?.[0]?.plain_text || "",
      email: properties["이메일"]?.email || "",
      phone: properties["전화번호"]?.phone_number || "",
      preferredDate: properties["희망 날짜"]?.date?.start || "",
      preferredTime: properties["희망 시간"]?.select?.name || "",
    };

    return NextResponse.json({ reservation });
  } catch (error: any) {
    console.error("Notion API 오류:", error);
    return NextResponse.json(
      { error: error.message || "예약 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}


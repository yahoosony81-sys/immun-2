import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { ReservationFormData } from "@/types/reservation";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    if (!process.env.NOTION_API_KEY) {
      return NextResponse.json(
        { error: "Notion API 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const { id, updates } = await request.json();

    const properties: any = {};

    if (updates.preferredDate) {
      properties["희망 날짜"] = {
        date: {
          start: updates.preferredDate,
        },
      };
    }

    if (updates.preferredTime) {
      properties["희망 시간"] = {
        select: {
          name: updates.preferredTime,
        },
      };
    }

    await notion.pages.update({
      page_id: id,
      properties,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Notion API 오류:", error);
    return NextResponse.json(
      { error: error.message || "예약 업데이트 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}


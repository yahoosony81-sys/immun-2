import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { ReservationFormData } from "@/types/reservation";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID || "";

export async function POST(request: NextRequest) {
  try {
    // 환경 변수 확인 및 로깅
    console.log("🔍 환경 변수 확인:", {
      hasApiKey: !!process.env.NOTION_API_KEY,
      apiKeyPrefix: process.env.NOTION_API_KEY?.substring(0, 10) + "...",
      hasDatabaseId: !!DATABASE_ID,
      databaseId: DATABASE_ID?.substring(0, 10) + "...",
    });
    
    if (!process.env.NOTION_API_KEY) {
      console.error("❌ NOTION_API_KEY가 설정되지 않았습니다.");
      return NextResponse.json(
        { error: "Notion API 키가 설정되지 않았습니다. .env 파일을 확인하고 서버를 재시작해주세요." },
        { status: 500 }
      );
    }
    
    if (!DATABASE_ID) {
      console.error("❌ NOTION_DATABASE_ID가 설정되지 않았습니다.");
      return NextResponse.json(
        { error: "Notion 데이터베이스 ID가 설정되지 않았습니다. .env 파일을 확인하고 서버를 재시작해주세요." },
        { status: 500 }
      );
    }

    // 요청 본문 안전하게 파싱
    let data: ReservationFormData;
    try {
      const bodyText = await request.text();
      console.log("📦 요청 본문 (raw):", bodyText);
      
      if (!bodyText || bodyText.trim() === "") {
        console.error("❌ 요청 본문이 비어있습니다.");
        return NextResponse.json(
          { error: "요청 본문이 비어있습니다." },
          { status: 400 }
        );
      }

      data = JSON.parse(bodyText);
      console.log("📝 예약 데이터 수신:", data);
    } catch (parseError: any) {
      console.error("❌ JSON 파싱 오류:", parseError);
      return NextResponse.json(
        { error: "잘못된 요청 형식입니다.", details: parseError.message },
        { status: 400 }
      );
    }

    // 노션 데이터베이스에 페이지 생성
    console.log("🚀 노션 API 호출 시작...");
    console.log("📋 전송할 속성:", {
      이름: data.name,
      이메일: data.email,
      전화번호: data.phone,
      "희망 날짜": data.preferredDate,
      "희망 시간": data.preferredTime,
    });

    // 기본 속성 구성
    const properties: any = {
      이름: {
        title: [
          {
            text: {
              content: data.name,
            },
          },
        ],
      },
      이메일: {
        email: data.email,
      },
      전화번호: {
        phone_number: data.phone,
      },
      "희망 날짜": {
        date: {
          start: data.preferredDate,
        },
      },
      "희망 시간": {
        select: {
          name: data.preferredTime,
        },
      },
    };

    console.log("📤 노션 API 호출 - properties:", JSON.stringify(properties, null, 2));
    
    const response = await notion.pages.create({
      parent: {
        database_id: DATABASE_ID,
      },
      properties,
    });

    console.log("✅ 노션 API 응답 받음:", {
      id: response.id,
      url: response.url,
      created_time: response.created_time,
      properties: Object.keys(response.properties || {}),
      nameProperty: response.properties["이름"],
    });
    
    // 응답에서 실제 저장된 이름 확인
    const savedName = (response.properties as any)["이름"]?.title?.[0]?.plain_text || "없음";
    console.log("💾 저장된 예약자 이름:", savedName);
    
    return NextResponse.json({
      id: response.id,
      success: true,
      notionUrl: response.url,
      savedName: savedName,
    });
  } catch (error: any) {
    console.error("❌ Notion API 오류:", error);
    console.error("오류 상세:", {
      message: error.message,
      code: error.code,
      status: error.status,
      body: error.body,
    });
    return NextResponse.json(
      { 
        error: error.message || "예약 저장 중 오류가 발생했습니다.",
        details: error.body || error.code || "알 수 없는 오류"
      },
      { status: 500 }
    );
  }
}


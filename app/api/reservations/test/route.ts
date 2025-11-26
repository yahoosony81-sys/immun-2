import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID || "";

export async function GET(request: NextRequest) {
  const checkResults: any = {
    step1_envCheck: {},
    step2_apiConnection: {},
    step3_databaseAccess: {},
  };

  try {
    // 1단계: 환경 변수 확인
    checkResults.step1_envCheck = {
      hasApiKey: !!process.env.NOTION_API_KEY,
      apiKeyPrefix: process.env.NOTION_API_KEY?.substring(0, 15) + "...",
      hasDatabaseId: !!DATABASE_ID,
      databaseId: DATABASE_ID?.substring(0, 10) + "...",
      fullDatabaseId: DATABASE_ID,
    };

    if (!process.env.NOTION_API_KEY || !DATABASE_ID) {
      return NextResponse.json(
        { 
          success: false,
          error: "환경 변수가 설정되지 않았습니다.",
          checks: checkResults,
        },
        { status: 500 }
      );
    }

    // 2단계: 노션 API 연결 테스트 (간단한 API 호출)
    try {
      // 사용자 정보 조회로 API 연결 테스트
      const user = await notion.users.me();
      checkResults.step2_apiConnection = {
        success: true,
        userId: user.id,
        userName: user.name || "알 수 없음",
      };
    } catch (apiError: any) {
      checkResults.step2_apiConnection = {
        success: false,
        error: apiError.message,
        code: apiError.code,
        status: apiError.status,
      };
      return NextResponse.json(
        {
          success: false,
          error: "노션 API 연결 실패",
          checks: checkResults,
        },
        { status: 500 }
      );
    }

    // 3단계: 데이터베이스 접근 테스트
    try {
      const database = await notion.databases.retrieve({
        database_id: DATABASE_ID,
      });

      checkResults.step3_databaseAccess = {
        success: true,
        databaseId: database.id,
        title: database.title?.[0]?.plain_text || "제목 없음",
        properties: Object.keys(database.properties),
        propertyDetails: Object.entries(database.properties).map(([key, value]: [string, any]) => ({
          name: key,
          type: value.type,
          options: value.type === 'select' ? value.select?.options?.map((opt: any) => opt.name) : undefined,
        })),
      };

      return NextResponse.json({
        success: true,
        message: "노션 API 연결 및 데이터베이스 접근 성공!",
        checks: checkResults,
      });
    } catch (dbError: any) {
      checkResults.step3_databaseAccess = {
        success: false,
        error: dbError.message,
        code: dbError.code,
        status: dbError.status,
        body: dbError.body,
      };
      return NextResponse.json(
        {
          success: false,
          error: "데이터베이스 접근 실패",
          checks: checkResults,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("노션 데이터베이스 테스트 오류:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "알 수 없는 오류",
        code: error.code,
        status: error.status,
        checks: checkResults,
      },
      { status: 500 }
    );
  }
}


import { AnalyticsDataClient } from '@google-analytics/data';

const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'); 

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: PRIVATE_KEY,
  },
});

/**
 * Google Analytics에서 지정된 페이지 경로의 총 조회수
 * @param pagePath 조회수를 가져올 페이지 경로
 * @returns 해당 경로의 총 조회수
 */
export async function getPageViews(pagePath: string): Promise<number> {
  if (!GA_PROPERTY_ID) {
    console.error("GA_PROPERTY_ID is not set.");
    return 0;
  }
  
  if (!analyticsDataClient || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
    console.error("Google Analytics authentication credentials are not fully set.");
    return 0;
  }

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '2025-03-01',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'pagePath',
        },
      ],
      metrics: [
        {
          name: 'screenPageViews',
        },
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'pagePath',
          stringFilter: {
            matchType: 'EXACT',
            value: pagePath, // /blog/[slug]와 일치하는 경로 필터링
          },
        },
      },
    });

    // 조회수 (screenPageViews) 값을 추출
    const viewCount = response.rows?.[0]?.metricValues?.[0]?.value;

    return viewCount ? parseInt(viewCount, 10) : 0;
  } catch (error) {
    console.error('Error fetching GA data:', error);
    return 0;
  }
}

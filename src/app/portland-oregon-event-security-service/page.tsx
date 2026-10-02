import { makeServicePage } from '@/components/service-page-template';

const { generateMetadata, Page } = makeServicePage('portland-oregon-event-security-service');

export const metadata = generateMetadata();
export default Page;
import { makeServicePage } from '@/components/service-page-template';

const { generateMetadata, Page } = makeServicePage('local-alarm-response-service');

export const metadata = generateMetadata();
export default Page;
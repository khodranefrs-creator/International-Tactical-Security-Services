import { makeServicePage } from '@/components/service-page-template';

const { generateMetadata, Page } = makeServicePage('fire-watch-security-service');

export const metadata = generateMetadata();
export default Page;
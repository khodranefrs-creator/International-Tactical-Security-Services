import { makeServicePage } from '@/components/service-page-template';

const { generateMetadata, Page } = makeServicePage('mobile-patrol-security');

export const metadata = generateMetadata();
export default Page;
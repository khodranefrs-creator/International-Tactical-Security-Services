import { makeServicePage } from '@/components/service-page-template';

const { generateMetadata, Page } = makeServicePage('dedicated-executive-protection');

export const metadata = generateMetadata();
export default Page;
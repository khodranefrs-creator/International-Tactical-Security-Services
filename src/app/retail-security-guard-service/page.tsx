import { makeServicePage } from '@/components/service-page-template';

const { generateMetadata, Page } = makeServicePage('retail-security-guard-service');

export const metadata = generateMetadata();
export default Page;
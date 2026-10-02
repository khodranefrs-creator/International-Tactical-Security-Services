import { makeServicePage } from '@/components/service-page-template';

const { generateMetadata, Page } = makeServicePage('bank-security-guard-service');

export const metadata = generateMetadata();
export default Page;
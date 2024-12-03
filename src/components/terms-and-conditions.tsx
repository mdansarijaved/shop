import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Terms and Conditions</CardTitle>
          <CardDescription>
            Last updated: {new Date().toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full rounded-md border p-4">
            <div className="prose prose-sm max-w-none">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be
                bound by the terms and provision of this agreement.
                Additionally, when using this website's particular services, you
                shall be subject to any posted guidelines or rules applicable to
                such services.
              </p>

              <h2>2. Products and Services</h2>
              <p>
                We attempt to be as accurate as possible with product
                descriptions. However, we do not warrant that product
                descriptions or other content of this site is accurate,
                complete, reliable, current, or error-free.
              </p>

              <h2>3. Pricing and Availability</h2>
              <p>
                All prices are subject to change without notice. We reserve the
                right to modify or discontinue any product or service without
                notice. We shall not be liable to you or any third party for any
                modification, price change, suspension or discontinuance of the
                service.
              </p>

              <h2>4. User Accounts</h2>
              <p>
                If you create an account on the website, you are responsible for
                maintaining the security of your account, and you are fully
                responsible for all activities that occur under the account and
                any other actions taken in connection with it.
              </p>

              <h2>5. Privacy Policy</h2>
              <p>
                Your submission of personal information through the store is
                governed by our Privacy Policy. Please review our Privacy
                Policy, which also governs the Site and informs users of our
                data collection practices.
              </p>

              <h2>6. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and
                functionality are and will remain the exclusive property of our
                company and its licensors. The Service is protected by
                copyright, trademark, and other laws of both the United States
                and foreign countries.
              </p>

              <h2>7. User-Generated Content</h2>
              <p>
                Users may post reviews, comments, and other content as long as
                the content is not illegal, obscene, threatening, defamatory,
                invasive of privacy, infringing of intellectual property rights,
                or otherwise injurious to third parties.
              </p>

              <h2>8. Termination</h2>
              <p>
                We may terminate or suspend your account and bar access to the
                Service immediately, without prior notice or liability, under
                our sole discretion, for any reason whatsoever and without
                limitation, including but not limited to a breach of the Terms.
              </p>

              <h2>9. Limitation of Liability</h2>
              <p>
                In no event shall we, nor our directors, employees, partners,
                agents, suppliers, or affiliates, be liable for any indirect,
                incidental, special, consequential or punitive damages,
                including without limitation, loss of profits, data, use,
                goodwill, or other intangible losses, resulting from your access
                to or use of or inability to access or use the Service.
              </p>

              <h2>10. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with
                the laws of [Your Country/State], without regard to its conflict
                of law provisions.
              </p>

              <h2>11. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. What constitutes a material
                change will be determined at our sole discretion. By continuing
                to access or use our Service after those revisions become
                effective, you agree to be bound by the revised terms.
              </p>

              <h2>12. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us
                at [Your Contact Information].
              </p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

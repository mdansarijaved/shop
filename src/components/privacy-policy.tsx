import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
          <CardDescription>
            Last updated: {new Date().toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full rounded-md border p-4">
            <div className="prose prose-sm max-w-none">
              <h2>1. Introduction</h2>
              <p>
                Your privacy is important to us. It is [Your Company Name]'s
                policy to respect your privacy regarding any information we may
                collect from you across our website, [Your Website URL], and
                other sites we own and operate.
              </p>

              <h2>2. Information We Collect</h2>
              <p>
                We only ask for personal information when we truly need it to
                provide a service to you. We collect it by fair and lawful
                means, with your knowledge and consent. We also let you know why
                we're collecting it and how it will be used.
              </p>

              <h2>3. Use of Information</h2>
              <p>
                We may use your personal information for the following purposes:
              </p>
              <ul>
                <li>To provide and maintain our service</li>
                <li>To notify you about changes to our service</li>
                <li>
                  To allow you to participate in interactive features of our
                  service when you choose to do so
                </li>
                <li>To provide customer support</li>
                <li>
                  To gather analysis or valuable information so that we can
                  improve our service
                </li>
                <li>To monitor the usage of our service</li>
                <li>To detect, prevent and address technical issues</li>
                <li>
                  To provide you with news, special offers and general
                  information about other goods, services and events which we
                  offer
                </li>
              </ul>

              <h2>4. Log Data</h2>
              <p>
                We want to inform you that whenever you visit our service, we
                collect information that your browser sends to us that is called
                Log Data. This Log Data may include information such as your
                computer's Internet Protocol ("IP") address, browser version,
                pages of our service that you visit, the time and date of your
                visit, the time spent on those pages, and other statistics.
              </p>

              <h2>5. Cookies</h2>
              <p>
                Cookies are files with small amount of data that is commonly
                used an anonymous unique identifier. These are sent to your
                browser from the website that you visit and are stored on your
                computer's hard drive. Our website uses these "cookies" to
                collection information and to improve our service.
              </p>

              <h2>6. Service Providers</h2>
              <p>
                We may employ third-party companies and individuals due to the
                following reasons:
              </p>
              <ul>
                <li>To facilitate our service</li>
                <li>To provide the service on our behalf</li>
                <li>To perform service-related services</li>
                <li>To assist us in analyzing how our service is used</li>
              </ul>
              <p>
                We want to inform our service users that these third parties
                have access to your Personal Information. The reason is to
                perform the tasks assigned to them on our behalf. However, they
                are obligated not to disclose or use the information for any
                other purpose.
              </p>

              <h2>7. Security</h2>
              <p>
                We value your trust in providing us your Personal Information,
                thus we are striving to use commercially acceptable means of
                protecting it. But remember that no method of transmission over
                the internet, or method of electronic storage is 100% secure and
                reliable, and we cannot guarantee its absolute security.
              </p>

              <h2>8. Links to Other Sites</h2>
              <p>
                Our service may contain links to other sites. If you click on a
                third-party link, you will be directed to that site. Note that
                these external sites are not operated by us. Therefore, we
                strongly advise you to review the Privacy Policy of these
                websites. We have no control over, and assume no responsibility
                for the content, privacy policies, or practices of any
                third-party sites or services.
              </p>

              <h2>9. Children's Privacy</h2>
              <p>
                Our services do not address anyone under the age of 13. We do
                not knowingly collect personal identifiable information from
                children under 13. In the case we discover that a child under 13
                has provided us with personal information, we immediately delete
                this from our servers. If you are a parent or guardian and you
                are aware that your child has provided us with personal
                information, please contact us so that we will be able to do
                necessary actions.
              </p>

              <h2>10. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. Thus, we
                advise you to review this page periodically for any changes. We
                will notify you of any changes by posting the new Privacy Policy
                on this page. These changes are effective immediately, after
                they are posted on this page.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                If you have any questions or suggestions about our Privacy
                Policy, do not hesitate to contact us at [Your Contact
                Information].
              </p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

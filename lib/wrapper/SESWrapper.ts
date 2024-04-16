import * as ses from "aws-cdk-lib/aws-ses";
import * as route53 from "aws-cdk-lib/aws-route53";
import { Route53Wrapper } from "./Route53Wrapper";
import { WrapperBase, WrapperBaseProps } from "./WrapperBase";

interface Props extends WrapperBaseProps {
  route53Wrapper: Route53Wrapper;
}

export class SESWrapper extends WrapperBase {
  private route53Wrapper: Route53Wrapper;
  public emailIdentity: ses.EmailIdentity;
  private domain: string;

  constructor(props: Props) {
    super(props);

    this.initialize(props);
  }

  private readonly initialize = (props: Props): void => {
    this.setAdditionalValues(props);
    this.createEmailIdentity();
    this.createRecords();
  };

  private readonly setAdditionalValues = (props: Props): void => {
    const { route53Wrapper } = props;
    this.route53Wrapper = route53Wrapper;
    this.domain = `mail.${this.route53Wrapper.hostedZone.zoneName}`;
  };

  private readonly createEmailIdentity = (): void => {
    this.emailIdentity = new ses.EmailIdentity(
      this.scope,
      `${this.appId}-email-identity`,
      {
        identity: ses.Identity.publicHostedZone(this.route53Wrapper.hostedZone),
        mailFromDomain: this.domain,
      }
    );
  };

  private readonly createRecords = (): void => {
    this.emailIdentity.dkimRecords.forEach((record, index) => {
      const id = `${this.appId}-dkim-record${index + 1}`;
      new route53.CnameRecord(this.scope, id, {
        domainName: record.value,
        zone: this.route53Wrapper.hostedZone,
        recordName: record.name,
      });
    });
  };
}

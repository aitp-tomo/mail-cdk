import * as route53 from "aws-cdk-lib/aws-route53";
import { WrapperBase, WrapperBaseProps } from "./WrapperBase";

interface Props extends WrapperBaseProps {
  hostedZoneId: string;
  zoneName: string;
}

export class Route53Wrapper extends WrapperBase {
  private hostedZoneId: string;
  private zoneName: string;
  public hostedZone: route53.IPublicHostedZone;

  constructor(props: Props) {
    super(props);
    this.setAdditionalValues(props);
    this.getHostedZone();
  }

  private readonly setAdditionalValues = (props: Props): void => {
    const { hostedZoneId, zoneName } = props;
    this.hostedZoneId = hostedZoneId;
    this.zoneName = zoneName;
  };

  private readonly getHostedZone = (): void => {
    this.hostedZone = route53.PublicHostedZone.fromPublicHostedZoneAttributes(
      this.scope,
      `${this.appId}-hosted-zone`,
      {
        hostedZoneId: this.hostedZoneId,
        zoneName: this.zoneName,
      }
    );
  };
}

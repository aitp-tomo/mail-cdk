import { Construct } from "constructs";
import { StackBase, StackBaseProps } from "./StackBase";
import { Route53Wrapper } from "../wrapper/Route53Wrapper";
import { SESWrapper } from "../wrapper/SESWrapper";

export interface MainStackProps extends StackBaseProps {
  hostedZoneId: string;
  zoneName: string;
}

export class MainStack extends StackBase {
  private hostedZoneId: string;
  private zoneName: string;

  constructor(scope: Construct, id: string, props: MainStackProps) {
    super(scope, id, props);

    this.initialize(props);
  }

  private readonly initialize = (props: MainStackProps): void => {
    this.setAdditionalValues(props);
    this.createArchitectures();
  };

  private readonly setAdditionalValues = (props: MainStackProps): void => {
    const { hostedZoneId, zoneName } = props;
    this.hostedZoneId = hostedZoneId;
    this.zoneName = zoneName;
  };

  private readonly createArchitectures = (): void => {
    const commonProps = {
      scope: this,
      appId: this.appId,
    };
    const route53Wrapper = new Route53Wrapper({
      ...commonProps,
      hostedZoneId: this.hostedZoneId,
      zoneName: this.zoneName,
    });
    new SESWrapper({
      ...commonProps,
      route53Wrapper,
    });
  };
}

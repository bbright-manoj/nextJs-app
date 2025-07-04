import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "reactstrap";

const DealBanner: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Container>
        <Row>
          <Col md="12" lg="8">
            <div className="deal-banner-containe">
              <h2>{t("deal")}</h2>
              <h1>{t("dealText")}</h1>
            </div>
          </Col>
          <Col md="12" lg="4">
            <div className="deal-banner-containe">
              <div className="deal-btn">
                <a className="btn-white">View more</a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DealBanner;

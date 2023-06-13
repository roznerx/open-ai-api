import {
  Column,
  Img,
  Row,
  Text,
  Section,
  Button,
} from "@react-email/components"
import React from "react"

export const RowWithImage = ({
  title = "",
  buttonLink = "",
  text,
  imageUrl,
  buttonText = "Click here",
}) => {
  const rowStyle = {
    display: "flex",
    marginTop: "40px",
    marginBottom: "60px",
    paddingRight: "12px",
  }

  const textColumnStyle = {
    flex: 1,
    color: "#fff",
    fontSize: "16px",
    width: "80%",
    verticalAlign: "top",
  }
  const titleStyle = {
    color: "#fff",
    fontSize: "20px",
    fntWeight: "600",
  }

  const imageColumnStyle = {
    flex: 1,
    width: "30%",
  }

  const imageStyle = {
    maxWidth: "100%",
    height: "auto",
  }

  return (
    <Row style={rowStyle}>
      <Text style={titleStyle}>{title}</Text>
      <Text style={textColumnStyle}>{text}</Text>
      <Section>
        <Button pY={19} style={button} href={buttonLink}>
          {buttonText}
        </Button>
      </Section>
      <Column style={imageColumnStyle}>
        <Img
          src={imageUrl}
          width={248}
          height={138}
          alt="Image"
          style={imageStyle}
        />
      </Column>
    </Row>
  )
}

const button = {
  paddingTop: "7px",
  backgroundColor: "#A1FFE0",
  borderRadius: "10px",
  color: "#101018",
  fontSize: "18px",
  fontWeight: 500,
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "230px",
  height: "40px",
}

{
  /* <Link
          href={buttonLink}
          style={{
            color: "#101018",
            display: "block",
            textAlign: "center",
            padding: "8px 5px",
            fontWeight: 500,
            backgroundColor: "#A1FFE0",
            width: "230px",
            height: "40px",
            borderRadius: "8px",
          }}
        >
          {buttonText}
        </Link> */
}

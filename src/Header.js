import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({
  title,
  title2,
  cases,
  isRed,
  isGreen,
  active,
  today,
  ...props
}) {
  console.log(active);
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "--selected"}`}
    >
      <CardContent>
        <Typography color="textSecondary">{title}</Typography>
        <h3 className={`infoBox_cases ${!isRed && "isGreen"}`}>{cases}</h3>

        <Typography className="infoBox_total" color="textSecondary">
          {title2} <strong>{today}</strong>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;

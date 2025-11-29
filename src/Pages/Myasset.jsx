import React from "react";

import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import { ControlPoint } from "@mui/icons-material";
import AssetCard from "../Components/AssetCard";
import { useSelector } from "react-redux";

function Myasset() {
  const assets = useSelector((state) => state.assetsReducer.assets);

  return (
    <Container>
      <div className="dashboard-container">
        <div className="top">
          <Button
            sx={{
              position: "absolute",
              right: 0,
            }}
            LinkComponent={Link}
            to="add/asset"
            // color="secondary"
            onClick={() => {}}
            endIcon={<ControlPoint />}
            size="small"
            variant="contained"
          >
            Add Assets
          </Button>

          <Typography className="heading">My Assets</Typography>

          <div className="my-assets-list">
            {assets?.length > 0 ? (
              assets.map((ele, i) => (
                <AssetCard
                  key={i + "_" + ele?.serialNumber}
                  assetDetail={ele}
                />
              ))
            ) : (
              <div className="no-content">
                <img
                  src={require("../assets/images/empty.png")}
                  alt="empty-box"
                />
                <Typography variant="body2">No Asset!</Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Myasset;

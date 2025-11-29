import { useState, useCallback } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Delete, Edit, ExpandCircleDown } from "@mui/icons-material";
import { Divider, Menu, MenuItem } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeAssets } from "../Redux/features/assets/assetSlice";
import { CircularProgress } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function AssetCard({ assetDetail }) {
  const [expanded, setExpanded] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [isDeleting, setIsDeleting] = useState(false);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteAsset = useCallback(() => {
    setIsDeleting(true);
    let serialNumber = assetDetail?.serialNumber;
    console.log("serialNumber::", serialNumber);

    dispatch(removeAssets(serialNumber));

    setIsDeleting(false);
  }, [assetDetail]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ maxWidth: 500, minWidth: 300 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {assetDetail?.assetName
                ?.split(" ")
                .map((ele) => ele.charAt(0))
                .join()
                .replace(",", " ")}
            </Avatar>
          }
          action={
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={assetDetail?.assetName}
          subheader={assetDetail?.serialNumber}
        />
        <CardMedia
          component="img"
          image={assetDetail?.assetImage || ""}
          alt={assetDetail?.assetName}
          loading="true"
          sx={{
            maxHeight: "300px",
            width: "300px",
            margin: "auto",
          }}
        />

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            component={Link}
            to={`configure?serialNumber=${assetDetail?.serialNumber}`}
            dense
            onClick={handleClose}
          >
            Configure Asset
          </MenuItem>
          <MenuItem
            component={Link}
            to={`live-data?serialNumber=${assetDetail?.serialNumber}`}
            dense
            onClick={handleClose}
          >
            Live Data
          </MenuItem>
        </Menu>

        <CardActions disableSpacing>
          <Tooltip title="Edit Asset">
            <IconButton
              component={Link}
              to={`edit/asset?serialNumber=${assetDetail?.serialNumber}`}
              aria-label="edit asset"
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Asset">
            <IconButton
              disabled={isDeleting}
              aria-label="delete asset"
              onClick={handleDeleteAsset}
            >
              {isDeleting ? (
                <CircularProgress size={"1.5rem"} color="secondary" />
              ) : (
                <Delete />
              )}
            </IconButton>
          </Tooltip>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandCircleDown />
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Divider
              sx={{
                marginBottom: "1rem",
              }}
            />
            <div className="asset-content">
              <div>
                <Typography variant="h6" className="heading" gutterBottom>
                  Asset Group
                </Typography>
                <Typography>{assetDetail?.assetGroup?.value || ""}</Typography>
              </div>

              <Divider orientation="vertical" variant="middle" flexItem />

              <div>
                <Typography variant="h6" className="heading" gutterBottom>
                  Plant
                </Typography>
                <Typography>{assetDetail?.plant?.value || ""}</Typography>
              </div>

              <Divider orientation="vertical" variant="middle" flexItem />

              <div>
                <Typography variant="h6" className="heading" gutterBottom>
                  Connection Type
                </Typography>
                <Typography>
                  {assetDetail?.connectionType?.value || "NA"}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Collapse>
      </Card>
    </motion.div>
  );
}

export default AssetCard;

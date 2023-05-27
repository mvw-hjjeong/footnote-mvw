/* eslint-disable space-before-function-paren */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable key-spacing */
/* eslint-disable jsx-quotes */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
import { useState, useMemo, useRef } from "react";
import parse from "html-react-parser";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { CardContent, TextField, Card, CardHeader, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InputAdornment from "@mui/material/InputAdornment";
import EditNoteIcon from "@mui/icons-material/EditNote";
interface IForm {
  name: string;
  department: string;
  position: string;
  address: string;
  smartphone: string;
  mail: string;
  companyCall: string;
  companyMail: string;
  companySite: string;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const FONT_FAMILY = "NanumSquare,Arial";
const FONT_SIZE_SMALL = 15;
const FONT_SIZE_MIDIUM = 16;
const FONT_SIZE_LARGE = 25;
const MARGIN_BY_TABLE = 28;

const makeHtml = ({
  name,
  department,
  position,
  address,
  smartphone,
  mail,
  companyCall,
  companyMail,
  companySite,
}: IForm) => {
  return `
  <table cellpadding='0' cellspacing='0' style='vertical-align: -webkit-baseline-middle; font-family: ${FONT_FAMILY};width:100%;'>
  <tbody>
    <tr>
      <table cellpadding='0' cellspacing='0' style='vertical-align: -webkit-baseline-middle; font-family: ${FONT_FAMILY};margin-top:10px;margin-left:${MARGIN_BY_TABLE}px;'>
        <tbody>
          <tr>
            <td style='display: flex;align-items: end;'>
              <p>
                <span style='font-weight: 750;letter-spacing:8px;font-size: ${FONT_SIZE_LARGE}px; color:#060403 ; '>${name}</span>
              </p>
              <p style='margin-top:26px;'><small style='margin: 0px; font-size: ${FONT_SIZE_MIDIUM}px; color:#060403 ;margin-right:10px;border-left:#f1f1f1 1px solid; padding-left:12px;'>${department}·${position}</small></p>
            </td>
          </tr>
        </tbody>
      </table>
    </tr>
    <tr style='flex-direction:row;'>
      <td style='padding: 5px; padding-left: 20px;'>
        <table cellpadding='0' cellspacing='0' style='vertical-align: -webkit-baseline-middle; font-family: ${FONT_FAMILY};margin-left:${MARGIN_BY_TABLE}px;'>
          <tbody>
            <tr>
              <td style='width: 130px;'>
                <table cellpadding='0' cellspacing='0' style='vertical-align: -webkit-baseline-middle; ; font-family: ${FONT_FAMILY};width: max-content;margin-right: 20px;'>
                  <tbody>
                    <tr>
                      <td style='display:flex;'>
                        <img alt='' style='width:23px;' src='https://github.com/mvw-hjjeong/footnote-mvw/blob/main/assets/smartphone.png?raw=true' alt='smartphone' />
                      </td>
                      <td style='padding: 0px; color:#060403 ; font-size: ${FONT_SIZE_MIDIUM}px;'>
                        <span style='margin-left:5px;'>${smartphone}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td style='width: 130px;'>
                <table cellpadding='0' cellspacing='0' style='vertical-align: -webkit-baseline-middle; ; font-family: ${FONT_FAMILY};    width: max-content;'>
                  <tbody>
                    <tr>
                      <td style='display:flex;'>
                        <img style='width:23px;' alt='' src='https://github.com/mvw-hjjeong/footnote-mvw/blob/main/assets/mail.png?raw=true' alt='mail' />
                      </td>
                      <td style='padding: 0px; color:#060403 ; font-size: ${FONT_SIZE_MIDIUM}px;'>
                        <span style='margin-left:5px;'>${mail}@mv-w.com</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td style='padding: 5px; padding-left: 20px;'>
        <table cellpadding='0' cellspacing='0' style='vertical-align: -webkit-baseline-middle; font-family: ${FONT_FAMILY}; margin-top:${MARGIN_BY_TABLE}px;margin-left:${MARGIN_BY_TABLE}px;'>
          <tbody>
            <tr>
              <td style='width:245px; padding-right: 20px;'>
                <img alt='' src='https://tistory1.daumcdn.net/tistory/4647873/skinSetting/761a256b97e84b1a86a335b334cfd269' alt='alt_text' style='z-index: 1;width: 100%; height: auto; font-family: sans-serif; ' />
              </td>
              <td style='padding-left: 20px;border-left:#0463EF 1px solid;'>
                <table cellpadding='0' cellspacing='0' style='color:rgb(6, 4, 3);vertical-align: -webkit-baseline-middle; font-family: ${FONT_FAMILY};'>
                  <tbody>
                    <tr>
                      <td>
                        <span><b>T</b> : ${companyCall}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span><b>M</b> : ${companyMail}@mv-w.com</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span><b>W</b> : ${companySite}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td height='30'>
        <table cellpadding='0' cellspacing='0' style='vertical-align: -webkit-baseline-middle; font-family: ${FONT_FAMILY}; margin-top:${MARGIN_BY_TABLE}px;margin-left:${MARGIN_BY_TABLE}px;'>
          <tbody>
            <tr>
              <td>
                <span style='margin-top:20px;font-size: ${FONT_SIZE_SMALL}px;color:rgb(6, 4, 3)'>㈜모바휠 │ ${address}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
  `;
};

export function App() {
  const [info, setInfo] = useState<IForm>({
    name: "홍길동",
    department: "개발팀",
    position: "사원",
    address: "대전광역시 유성구 대학로 155번길 10 (궁동)",
    smartphone: "010-****-****",
    mail: "gdhong",
    companyCall: "070-5015-5978",
    companyMail: "service",
    companySite: "mv-w.com",
  });
  const [html, setHtml] = useState(makeHtml(info));
  const [infoLock, setInfoLock] = useState(true);
  const [alertState, setAlertState] = useState({ isOpen: false, message: "" });
  const handleEdit = () => {
    setHtml(makeHtml(info));
  };
  const handleInputChange = (key: string, value: string) => {
    let _value = value;
    console.log(value)
    if (key === "smartphone" || key === "companyCall") {
      if (_value.length === 8) {
        _value = _value.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
      }
      if (_value.length === 11) {
        _value = _value
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
        console.log(_value);
      }
    } else if ((key === "mail" || key === "companyMail") && value.includes('@')) {
      setAlertState({
        isOpen: true,
        message: "@mv-w.com 을 입력할 필요는 없습니다!",
      });
      return -1;
    }

    setInfo((prevState) => ({
      ...prevState,
      [key]: _value,
    }));
  };
  const handleAlertClick = (message) => {
    setAlertState({ isOpen: true, message });
  };

  const handleAlertClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertState({ isOpen: false, message: "" });
  };

  const parsedHTML = useMemo(() => <Item>{parse(html)}</Item>, [html]);
  return (
    <Box sx={{ flexGrow: 1, pt: 5, padding: "2rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          {" "}
          <TextField
            label="이름"
            fullWidth
            onChange={(event) => {
              handleInputChange("name", event.target.value);
            }}
            value={info.name}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            label="부서"
            fullWidth
            onChange={(event) => {
              handleInputChange("department", event.target.value);
            }}
            value={info.department}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            label="직급"
            fullWidth
            onChange={(event) => {
              handleInputChange("position", event.target.value);
            }}
            value={info.position}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="휴대폰번호"
            fullWidth
            onChange={(event) => {
              handleInputChange("smartphone", event.target.value);
            }}
            value={info.smartphone}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="이메일"
            fullWidth
            onChange={(event) => {
              handleInputChange("mail", event.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">@mv-w.com</InputAdornment>
              ),
            }}
            value={info.mail}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
          <Tooltip title="입력 잠금해제">
            <IconButton
              aria-label="잠금해제"
              color="primary"
              size="large"
              onClick={() => setInfoLock(!infoLock)}
            >
              <EditNoteIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="대표번호"
            disabled={infoLock}
            fullWidth
            onChange={(event) => {
              handleInputChange("companyCall", event.target.value);
            }}
            value={info.companyCall}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="대표메일"
            disabled={infoLock}
            fullWidth
            onChange={(event) => {
              handleInputChange("companyMail", event.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">@mv-w.com</InputAdornment>
              ),
            }}
            value={info.companyMail}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="공식사이트"
            disabled={infoLock}
            fullWidth
            onChange={(event) => {
              handleInputChange("companySite", event.target.value);
            }}
            value={info.companySite}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            label="본사주소"
            disabled={infoLock}
            fullWidth
            onChange={(event) => {
              handleInputChange("address", event.target.value);
            }}
            value={info.address}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleEdit}
            sx={{ width: "30%", minWidth: 200, float: "right" }}
          >
            입력정보 반영하기
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="HTML PREVIWER"
              subheader="입력정보가 반영된 HTML의 previewer입니다."
              action={
                <CopyToClipboard
                  text={html}
                  onCopy={() =>
                    handleAlertClick("HTML이 클립보드에 복사되었습니다.")
                  }
                >
                  <Tooltip title="HTML 복사하기">
                    <IconButton
                      aria-label="HTML 복사하기"
                      color="primary"
                      size="large"
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </CopyToClipboard>
              }
            />
            <CardContent>
              <Paper>{parsedHTML}</Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
        open={alertState.isOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        message={alertState.message}
      />
    </Box>
  );
}

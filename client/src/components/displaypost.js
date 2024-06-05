import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import ShareIcon from '@mui/icons-material/Share';
import Divider from "@mui/material/Divider";
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import { useNavigate } from 'react-router-dom';


const ExpandMore = styled((props) => {

  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const PostCard = (props) => {
  const his=useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const [readstate, setreadstate] = React.useState(false);
  const { title, company, experience, date, name, email } = props;
  console.log(experience);
  const post = { "title": `${title}`, "company": `${company}`, "experience": `${experience}` };
  const post1 = JSON.stringify(post);
  let shareurl = `whatsapp://send?text=${post1}`;
  const handleExpandClick = () => {
    setExpanded(!expanded);
    setreadstate(!readstate);
  };

  const handleSave = async () => {
    const data = await fetch('http://localhost:8000/savepost', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email, title, company, experience, date, name
      })
    })
    const res = await data.json();
    if (res.status === 201) {
      alert("saved successfully");
    }
  }

  const handleDelete = async () => {
    const data1 = await fetch('http://localhost:8000/delete', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        title, company, experience, date, name, email
      })
    })
    const res1 = await data1.json();
    if (res1.status === 201) {
      alert('delete success');
      his('/main');
    }
    else {
      alert('deletion not success');
    }
  }
  return (
    <div style={{ alignItems: "center", marginLeft: "390px", fontSize: "20px", color: "grey" }}>
      <Card sx={{ maxWidth: 800 }} fontSize={20} style={{ backgroundColor: "grey" }}>
        <CardHeader color="text.primary"
          avatar={
            <Avatar sx={{ bgcolor: grey[500], border: '1px solid black', color: 'black' }} aria-label="recipe" color="text.primary">
              {name[0].toUpperCase()}
            </Avatar>
          }
          title={name}
          subheader={date}
        />
        <CardContent>
          <Typography variant="body2" color="text.primary" fontSize={19}>
            Job Role: {title}
            <br></br>
            Company: {company}
          </Typography>

        </CardContent>



        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph fontSize={17}>
              Experience: <div style={{ whiteSpace: 'pre-wrap' }}>
                <p>{experience}</p>
              </div>
            </Typography>

          </CardContent>
        </Collapse>
        <div style={{ marginLeft: "600px" }}><CardActions disableSpacing>

          <button expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more" style={{ border: "none", backgroundColor: "grey", color: "black" }}><span> {readstate === false ? "Read more..." : "Read less.."}</span></button>
        </CardActions></div>
        <Divider />
        {props.delete == true ? <IconButton aria-label="add to favorites" style={{ color: "black" }} onClick={handleDelete}>
          <DeleteOutlineSharpIcon />
        </IconButton> :
          <IconButton aria-label="add to favorites" style={{ color: "black" }} onClick={handleSave}>
            <BookmarksOutlinedIcon />
          </IconButton>}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <IconButton>
          <a href={shareurl} data-action="share/whatsapp/share" style={{ color: "black" }}>
            <ShareIcon />
          </a>
        </IconButton>

      </Card>
    </div>
  );
}

const express = require('express');
const router = new express.Router();
const db = require('../model/userSchema');
const bcrypt = require("bcryptjs");
const authenticate = require('../middleware/middleware')
const profiledb = require('../model/profile')
const postdb = require('../model/postschema');
const postsdb = require('../model/posts');
const savedPostdb=require('../model/savedPosts')
const { EngagespotClient } =require("@engagespot/node") ;


router.post('/register', async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword)
    res.status(422).json({ error: "enter all the details" });

  try {
    const preuser = await db.findOne({ email: email });
    if (preuser) {
      res.status(422).json({ error: "already registered with this email , plzzz login!!!" });
    }
    else if (password != cpassword)
      res.status(422).json({ error: "password doesn't match" });
    else {
      const user = new db({ name, email, password, cpassword });

      const newuserdata = await user.save();
      res.status(201).json({ status: 201, newuserdata })
    }
  }
  catch (error) {
    res.status(422).json(error);
  }

})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    res.status(422).json({ error: "enter all the details" });
  try {
    const userValid = await db.findOne({ email: email });

    if (userValid) {

      const isMatch = await bcrypt.compare(password, userValid.password);

      if (!isMatch) {
        res.status(422).json({ error: "invalid details" })
      }
      else {
        const token = await userValid.generateAuthtoken();
        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true
        });

        const result = {
          userValid,
          token
        }

        res.status(201).json({ status: 201, result, email })
      }
    } else {
      res.status(422).json({ error: "invalid details" })
    }

  } catch (error) {

  }

})

router.get("/validuser", authenticate, async (req, res) => {
  try {
    const ValidUserOne = await db.findOne({ _id: req.userId });
    const name = ValidUserOne.name;
    const email = ValidUserOne.email;
    const details = { name, email };
    res.status(201).json({ status: 201, email, name });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

router.get("/logout", authenticate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curr) => {
      return curr.token !== req.token
    });

    res.clearCookie("usercookie", { path: "/" });

    req.rootUser.save();

    res.status(201).json({ status: 201 })

  } catch (error) {
    res.status(401).json({ status: 401, error })
  }
})

router.post('/save', async (req, res) => {
  const { email, about, college, degree, year, skills } = req.body;
  try {

    let user_exist = await profiledb.findOne({ email: email });
    if (!user_exist) {
      const new_user = new profiledb({ email, about, college, degree, year, skills });
      await new_user.save();
      res.status(201).json({ status: 201, message: "success" });
    }
    else {
      const newvalues = {
        'about': about,
        'college': college,
        'degree': degree,
        'year': year,
        'skills': skills
      }
      const saved = await profiledb.updateMany({ email: email }, { '$set': newvalues });
      res.status(201).json({ status: 201, message: "success" });
    }

  } catch (err) {
    console.log(err);
  }
})

router.get('/save/:email', async (req, res) => {
  let saved_email = req.params.email;
  try {
    const savedArticles = await profiledb.findOne({ email: saved_email });
    res.json({ status: 201, savedArticles });
  } catch (error) {
    console.log(error);
  }
})



const client = EngagespotClient({
  apiKey: 'nwn8qie9j1joc2wn6gtyg',
  apiSecret: '7r2j9211jg10eja7n81fnne87e84a65e7j8dgj6f5ibh059bc'
})

router.post('/post', async (req, res) => {
  const {name, email, title, company, experience } = req.body;
  console.log(name);
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
  const post = { title, company, experience, date };
  try {
    let user_exist = await postdb.findOne({ email: email });
    if (!user_exist) {
      const new_user = new postdb({ email, post });
      await new_user.save()
    }
    const saved = await postdb.updateOne({ email: email }, { $push: { posts: post } });
    const new_post = new postsdb({ title, company, experience, date ,name});
    await new_post.save();
    const E=await db.find();
    console.log(E);
    const emails=[];
    E.map((element)=>{
      if(email!=element.email){
      emails.push(element.email)
      }
    })
    console.log(emails)
    emails.forEach((email)=>{
      console.log(email)
      client.send({
        notification:{
          title: `${title}`,
          message: `${company}`,
        },
        sendTo:{
          recipients: [email]
        }
      });
    })
    
    res.status(201).json({ status: 201, message: "success" });
  } catch (err) {
    console.log(err);
  }
})

router.get('/post', async (req, res) => {
  try {
    const data = await postsdb.find();
    res.status(201).json({ status: 201, data });
  } catch (error) {
    res.status(401).json({ status: 401, error })
  }
})

router.get('/yourpost/:email', async (req, res) => {
  let saved_email = req.params.email;
  try {
    const savedArticles = await postdb.findOne({ email: saved_email });
    res.json({ status: 201, savedArticles });
  } catch (error) {
    console.log(error);
  }
})

router.post('/savepost',async(req,res)=>{
  const { email, title, company, experience,date,name } = req.body;
  const post = { title, company, experience, date,name };
  try {
    let user_exist = await savedPostdb.findOne({ email: email });
    if (!user_exist) {
      const new_user = new savedPostdb({ email, post });
      await new_user.save()
    }
    const saved = await savedPostdb.updateOne({ email: email }, { $push: { savedPosts: post } });
    console.log(saved);
    res.status(201).json({ status: 201, message: "success" });
  } catch (err) {
    console.log(err);
  }
})

router.get('/saved/:email',async(req,res)=>{
  let saved_email=req.params.email;
  try{
  const savedArticles=await savedPostdb.findOne({email:saved_email});
  res.json({status:201,savedArticles});
  }catch(error){
    console.log(error);
  }
})

router.get('/search/:company',async(req,res)=>{
  const company1=req.params.company;
  console.log(company1)
  try{
  const searchedarticles=await postsdb.find({company: { $regex: new RegExp(`^${company1}$`, 'i')}});
  console.log(searchedarticles)
  res.json({status:201,searchedarticles});
  }catch(error){
    console.log(error);
  }
})

router.post('/delete', async (req, res) => {
  const {  title, company, experience, date, name,email} = req.body;
  console.log(title);
  console.log(email);
  try {
    const delete_article = await savedPostdb.updateOne({ email: email }, { $pull: { savedPosts: { title: title } } });
    console.log(delete_article);
    res.json({ status: 201, delete_article });
    
  } catch (error) {
    console.log(error);
  }
})


       


module.exports = router;
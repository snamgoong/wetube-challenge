import passport from "passport";
import GithubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import User from "./models/User";
import {githubLoginCallback, kakaoLoginCallback} from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());

//github login
passport.use(
    new GithubStrategy({
        clientID: process.env.GH_ID,
        clientSecret: process.env.GH_SECRET,
        callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

  //kakao login
passport.use(new KakaoStrategy({
    clientID : process.env.KAKAO_ID,
    clientSecret: process.env.KAKAO_SECRET, // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
    callbackURL : `http://localhost:4000${routes.kakaoCallback}`
  },
  kakaoLoginCallback
  )
)

passport.serializeUser(function (user, done) {
  done(null, user);
  });
  
passport.deserializeUser(function (id, done) {
  User.findById(id, function(err, user){
    done(err, user);
  })
  });

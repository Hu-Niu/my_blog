/**
 * 拦截需要校验token的路由，即该接口只有登录后才能访问
 *
 * 所有路由上有参数
 *  passport.authenticate('jwt', {session: false})的，
 *  都会被拦截进来，
 *  如果校验通过，放行，返回自定义的数据，
 *  如果校验未通过，拦截，前台直接返回401未授权
 *
 */
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const {keys} = require('../constant/config')
const {queryAdminUserByUid} = require('../service/adminUser')
const {queryWebUserByUid} = require('../service/webUser')
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        // identity:'adminUser'|'webUser'
        // 用来区分后台管理员登录还是前台用户登录
        const {uid, identity} = jwt_payload
        let result,user
        switch (identity) {
            case 'adminUser':
                result = await queryAdminUserByUid(uid)
                if(result){
                    user = {
                        uid: result.uid,
                        user_name: result.user_name,
                        user_profile: result.user_profile,
                        nick_name: result.nick_name,
                        role_name: result.role_name,
                        userEmail: result.user_email,
                        gender: result.gender,
                    }
                }
                break
            case 'webUser':
                result = await queryWebUserByUid(uid)
                if(result){
                    user = {
                        uid: result.uid,
                        user_profile: result.user_profile,
                        nick_name: result.nick_name,
                        user_identity: result.user_identity,

                        userEmail: result.user_email,
                        gender: result.gender,
                    }
                }
                break
        }

        if (!result) {
            return done(null, false)
        }
        return done(null, user)
    }));
}

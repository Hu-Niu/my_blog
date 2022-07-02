/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 50719
 Source Host           : localhost:3306
 Source Schema         : pupublog

 Target Server Type    : MySQL
 Target Server Version : 50719
 File Encoding         : 65001

 Date: 23/12/2021 18:06:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for mt_blog_blog_tag
-- ----------------------------
DROP TABLE IF EXISTS `mt_blog_blog_tag`;
CREATE TABLE `mt_blog_blog_tag`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一主键id，自增，数据库自己维护',
  `blog_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '博客的id',
  `blog_tag_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '博客标签的id',
  `create_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '创建时间',
  `update_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '修改时间',
  `blog_is_private` int(11) NULL DEFAULT 2 COMMENT '博客是否是私密的，1 私密；2 公开',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_blog_id`(`blog_id`) USING BTREE,
  CONSTRAINT `fk_blog_id` FOREIGN KEY (`blog_id`) REFERENCES `t_blog` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 188 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '中间表：博客&博客标签\r\n    表示博客所属的标签，\r\n    一篇博客可以有多个标签，一对多关系' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for mt_special_part_section_blogs
-- ----------------------------
DROP TABLE IF EXISTS `mt_special_part_section_blogs`;
CREATE TABLE `mt_special_part_section_blogs`  (
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键：唯一uuid，由服务端生成',
  `part_section_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '属于哪个章节：存放的是章节的uid',
  `blog_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '博客：存放的是博客的uid',
  `order_num` int(11) NULL DEFAULT 0 COMMENT '排序：0，1，2，3，4.....，数越大越靠后',
  `create_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '创建时间：由服务端生成',
  `update_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '修改时间：由服务端生成',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '章节下的文章：存放文章的uid' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_admin_role
-- ----------------------------
DROP TABLE IF EXISTS `t_admin_role`;
CREATE TABLE `t_admin_role`  (
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键：唯一uuid，由服务端生成',
  `role_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '角色名：管理员等等',
  `role_intro` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '角色简介：该角色的职责简介',
  `order_num` int(11) NULL DEFAULT 0 COMMENT '排序：0，1，2，3，4.....，数越大越靠后',
  `create_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '创建时间：由服务端生成',
  `update_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '修改时间：由服务端生成',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '管理员角色：存放角色信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_admin_user
-- ----------------------------
DROP TABLE IF EXISTS `t_admin_user`;
CREATE TABLE `t_admin_user`  (
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键：唯一uuid，由服务端生成',
  `user_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '管理员登录账号：一串字符串',
  `user_password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '管理员登录密码：后台加密后保存',
  `user_profile` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像：存放用户头像地址',
  `nick_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '昵称：用户昵称',
  `user_intro` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '管理员简介：',
  `user_profession` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '职业：',
  `user_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '管理员邮箱：',
  `role_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '属于哪类角色：存放的是角色的uid',
  `gender` int(11) NULL DEFAULT 1 COMMENT '性别：1，男；2，女',
  `login_ip_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '登录IP：用户最近一次登录的ip地址',
  `last_login_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '最后登录时间：用户最后一次登录的时间',
  `order_num` int(11) NULL DEFAULT 0 COMMENT '排序：0，1，2，3，4.....，数越大越靠后',
  `create_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '创建时间：由服务端生成',
  `update_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '修改时间：由服务端生成',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '后台管理员用户：存放可以登录后台的管理员账号信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_blog
-- ----------------------------
DROP TABLE IF EXISTS `t_blog`;
CREATE TABLE `t_blog`  (
  `uid` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '博客的唯一id',
  `blog_title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '博客的标题',
  `blog_summary` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '博客的概述',
  `blog_author_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '博客作者的id',
  `is_original` int(11) NOT NULL DEFAULT 1 COMMENT '是否是原创：1 原创；2转载；3 翻译；',
  `origin_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT '文章来源地址：当为转载或者翻译的文章时，填写的文章来源，如果为原创，该字段为空字符串',
  `blog_sort_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '博客分类的id',
  `recommend_level` int(11) NOT NULL DEFAULT -1 COMMENT '推荐等级：1 一级推荐；2 二级推荐；3 三级推荐；4 四级推荐；-1 不推荐',
  `clicks` int(11) NULL DEFAULT 0 COMMENT '博客点击量',
  `order_num` int(11) NOT NULL DEFAULT 0 COMMENT '排序：0，1，2，3，4.....，数越大越靠后',
  `is_open_comment` int(11) NOT NULL DEFAULT 1 COMMENT '是否开启评论：1 开启；2 关闭',
  `is_private` int(11) NOT NULL DEFAULT 2 COMMENT '是否为私密文章：1 是；2 否',
  `blog_status` int(11) NOT NULL DEFAULT 2 COMMENT '博客的状态：1 发布；2 下架；3 草稿；',
  `cover_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '博客封面的url',
  `blog_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '博客内容，存的是html',
  `create_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '博客创建时间',
  `update_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '博客修改时间',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin COMMENT = '博客详情表：\r\n    存储博客的相关信息，如标题、作者、推荐等级、内容、摘要等' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_blog_like
-- ----------------------------
DROP TABLE IF EXISTS `t_blog_like`;
CREATE TABLE `t_blog_like`  (
  `uid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键：唯一uuid，由服务端生成',
  `blog_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '文章id：对哪条文章的点赞，存放的评论id',
  `like_person_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '点赞人：点赞人的id',
  `order_num` int(11) NULL DEFAULT 0 COMMENT '排序：0，1，2，3，4.....，数越大越靠后',
  `create_time` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '创建时间：由服务端生成',
  `update_time` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '修改时间：由服务端生成',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '博客点赞表：存放用户对博客的点赞记录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_blog_sort
-- ----------------------------
DROP TABLE IF EXISTS `t_blog_sort`;
CREATE TABLE `t_blog_sort`  (
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT ' 博客分类的唯一id，主键',
  `sort_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT ' 分类名字',
  `intro` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT ' 类别的介绍信息',
  `clicks` int(11) NULL DEFAULT 0 COMMENT ' 点击数',
  `order_num` int(11) NULL DEFAULT 0 COMMENT ' 排序',
  `create_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT ' 创建时间',
  `update_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT ' 更新时间',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '博客分类表，存放博客的分类信息\r\n  比如：前端类、后台类、js类等等...' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_blog_tag
-- ----------------------------
DROP TABLE IF EXISTS `t_blog_tag`;
CREATE TABLE `t_blog_tag`  (
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '唯一id，主键',
  `tag_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标签名',
  `clicks` int(11) NULL DEFAULT 0 COMMENT '点击数',
  `order_num` int(11) NULL DEFAULT NULL COMMENT '排序，0，1，2，3，4，5...',
  `create_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '博客标签表\r\n        存放博客的标签，比如每篇博客涉及到的知识点' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_blog_test
-- ----------------------------
DROP TABLE IF EXISTS `t_blog_test`;
CREATE TABLE `t_blog_test`  (
  `uid` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '博客的唯一id，由服务端生成uuid传入',
  `blog_title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '博客的标题',
  `blog_summary` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '博客的概述',
  `blog_author_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '博客作者的id',
  `is_original` int(11) NOT NULL DEFAULT 1 COMMENT '是否是原创：1 原创；2转载；3 翻译；',
  `blog_sort_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '博客分类的id',
  `recommend_level` int(11) NULL DEFAULT -1 COMMENT '推荐等级：1 一级推荐；2 二级推荐；3 三级推荐；4 四级推荐；-1 不推荐',
  `clicks` int(11) NULL DEFAULT 0 COMMENT '博客点击量',
  `order_num` int(11) NULL DEFAULT 0 COMMENT '排序：0，1，2，3，4.....，数越大越靠后',
  `is_open_comment` int(11) NULL DEFAULT 1 COMMENT '是否开启评论：1 开启；2 关闭',
  `blog_status` int(11) NULL DEFAULT 2 COMMENT '博客的状态：1 发布；2 下架；3 草稿；',
  `cover_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '博客封面的url',
  `blog_content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '博客内容，存的是html',
  `create_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '博客创建时间',
  `update_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '博客修改时间',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '博客详情表：\r\n    存储博客的相关信息，如标题、作者、推荐等级、内容、摘要等' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_comments
-- ----------------------------
DROP TABLE IF EXISTS `t_comments`;
CREATE TABLE `t_comments`  (
  `uid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键：唯一uuid，由服务端生成',
  `comment_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '评论内容：',
  `comment_source` int(11) NOT NULL DEFAULT 1 COMMENT '评论来源：-1，关于我；1，留言板；2，专题；3，文章',
  `source_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '来源的id：存放对应来源的id，专题有专题uid，文章有文章uid，留言板uid给个默认值1，关于我uid默认值-1',
  `comment_status` int(11) NULL DEFAULT 1 COMMENT '评论状态：1，待审核；2，通过；3，违规评论',
  `comment_person_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '评论人：评论人的id',
  `commented_person_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '被评论人：被评论人的id，可以为空，第一条评论没有被评论人',
  `to_comment_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '回复的哪条评论：存放评论的id，可以为空，为空说明这条评论没有回复任何人，是第一条评论',
  `root_comment_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '根评论：存放根评论的id，这条评论链是从哪条评论发散出来的，即评论的源头，可以为空，为空说明这条评论就是根',
  `comment_layer` int(11) NOT NULL DEFAULT 1 COMMENT '评论层级：1，2，3，4，5；最多5层，避免无休止的评论，为1时表示为根评论，由前台传过来',
  `order_num` int(11) NULL DEFAULT 0 COMMENT '排序：0，1，2，3，4.....，数越大越靠后',
  `create_time` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '创建时间：由服务端生成',
  `update_time` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '修改时间：由服务端生成',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '评论表：' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_comments_inform
-- ----------------------------
DROP TABLE IF EXISTS `t_comments_inform`;
CREATE TABLE `t_comments_inform`  (
  `uid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键：唯一uuid，由服务端生成',
  `inform_type` int(11) NOT NULL DEFAULT 3 COMMENT '举报类型：1，内容包含钓鱼欺诈信息；2，内容包含色情信息；3，推广广告；',
  `inform_reason` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '举报原因：认真填写举报原因，尽可能描述详细',
  `inform_person_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '举报人：举报人的id',
  `inform_comment_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '被举报评论：被举报的评论的id',
  `comment_source` int(11) NOT NULL DEFAULT 1 COMMENT '举报的来源：-1，关于我；1，留言板；2，专题；3，文章',
  `source_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '举报来源的id：存放对应来源的id，专题有专题uid，文章有文章uid，留言板uid给个默认值-1',
  `order_num` int(11) NULL DEFAULT 0 COMMENT '排序：0，1，2，3，4.....，数越大越靠后',
  `create_time` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '创建时间：由服务端生成',
  `update_time` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '修改时间：由服务端生成',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '评论举报表：存放用户对某条评论的举报信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_comments_reaction
-- ----------------------------
DROP TABLE IF EXISTS `t_comments_reaction`;
CREATE TABLE `t_comments_reaction`  (
  `uid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键：唯一uuid，由服务端生成',
  `comment_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '评论id：对哪条评论的态度，存放的评论id',
  `reaction_person_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '发表态度人：发表态度人的id',
  `reaction_content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '态度：1 ?，2 ?，3 ?，4 ?，5 ?，6 ❤️，7 ?，8 ?，',
  `comment_source` int(11) NOT NULL DEFAULT 1 COMMENT '评论来源：-1，关于我；1，留言板；2，专题；3，文章',
  `source_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '来源的id：存放对应来源的id，专题有专题uid，文章有文章uid，留言板uid给个默认值-1',
  `order_num` int(11) NULL DEFAULT 0 COMMENT '排序：0，1，2，3，4.....，数越大越靠后',
  `create_time` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '创建时间：由服务端生成',
  `update_time` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '修改时间：由服务端生成',
  PRIMARY KEY (`uid`) USING BTREE,
  INDEX `fk_comment_reaction`(`comment_id`) USING BTREE,
  CONSTRAINT `fk_comment_reaction` FOREIGN KEY (`comment_id`) REFERENCES `t_comments` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '评论态度表：存放用户对某条评论的态度' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_file
-- ----------------------------
DROP TABLE IF EXISTS `t_file`;
CREATE TABLE `t_file`  (
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '唯一id',
  `file_original_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件原始名字',
  `file_current_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件上传到服务器，在服务器的名字',
  `file_suffix` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件的类型，存放文件的后缀',
  `file_sort_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件的分类，属于哪个分类下的文件，这个分类的id',
  `file_sort_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件的分类，属于哪个分类下的文件，这个分类的名字',
  `create_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '文件表：\r\n     存放上传的文件基本信息、文件名、文件id、文件上传时间等' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_file_sort
-- ----------------------------
DROP TABLE IF EXISTS `t_file_sort`;
CREATE TABLE `t_file_sort`  (
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '唯一id，主键',
  `cover_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类的封面图',
  `sort_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类的标题',
  `order_num` int(11) NULL DEFAULT 0 COMMENT '分类排序',
  `create_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '文件分类表：\r\n    存放文件属于哪个分类列表下，\r\n    博客系统主要上传图片资源，\r\n    所以存放图片的所属分类' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_role
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role`  (
  `uid` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '唯一UUID',
  `role_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色名',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `summarize` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色概述',
  `status` tinyint(2) NOT NULL DEFAULT 1 COMMENT '角色状态：1正常；2删除；',
  `user_uids` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '该角色下面所有的用户id，例如[\'1\',\'2\',\'3\']',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '角色表，不同角色的权限不同，只有一个超级管理员，拥有所有权限' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_special
-- ----------------------------
DROP TABLE IF EXISTS `t_special`;
CREATE TABLE `t_special`  (
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '专题的唯一id',
  `special_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '专题名：',
  `special_summary` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '专题的概述：',
  `cover_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '专题封面的url：',
  `special_sort_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '专题所属分类：存放的是分类的id',
  `clicks` int(11) NULL DEFAULT 0 COMMENT '专题的点击量：',
  `is_private` int(11) NULL DEFAULT 2 COMMENT '是否为私密文章：1 是；2 否',
  `order_num` int(11) NULL DEFAULT 0 COMMENT '排序：0，1，2，3，4.....，数越大越靠后',
  `create_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '创建时间：',
  `update_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '修改时间：',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '专题表：存放专题信息；比如：封面、名字、介绍、专题点击量' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_special_part
-- ----------------------------
DROP TABLE IF EXISTS `t_special_part`;
CREATE TABLE `t_special_part`  (
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键：唯一uuid，由服务端生成',
  `part_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '第几部分：第一部分、第二部分、第三部分等等',
  `part_title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '当前部分的大标题：',
  `part_summary` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '当前部分的概述：简要说明该部分的主旨内容',
  `special_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '属于哪个专题：存放的是专题的uid',
  `order_num` int(11) NULL DEFAULT 0 COMMENT '排序：0，1，2，3，4.....，数越大越靠后',
  `create_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '创建时间：由服务端生成',
  `update_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '修改时间：由服务端生成',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '专题内容中的第几部分：第一部分、第二部分、第三部分等等' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_special_part_section
-- ----------------------------
DROP TABLE IF EXISTS `t_special_part_section`;
CREATE TABLE `t_special_part_section`  (
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键：唯一uuid，由服务端生成',
  `section_title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '当前章节标题：',
  `special_part_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '属于哪个专题部分：存放的是专题部分的uid',
  `order_num` int(11) NULL DEFAULT 0 COMMENT '排序：0，1，2，3，4.....，数越大越靠后',
  `create_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '创建时间：由服务端生成',
  `update_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '修改时间：由服务端生成',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '专题某部分下的章节：存放章节标题' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_special_sort
-- ----------------------------
DROP TABLE IF EXISTS `t_special_sort`;
CREATE TABLE `t_special_sort`  (
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '专题分类名的唯一uid',
  `special_sort_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '专题分类名：',
  `order_num` int(11) NULL DEFAULT 0 COMMENT '排序：0，1，2，3，4.....，数越大越靠后',
  `create_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '创建时间：',
  `update_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '修改时间：',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '专题类别表：存放专题的类别信息，比如前端、后端、AI、生活等等' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_system_about_me
-- ----------------------------
DROP TABLE IF EXISTS `t_system_about_me`;
CREATE TABLE `t_system_about_me`  (
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键：唯一uuid，由服务端生成',
  `admin_user_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '管理员id：属于哪个管理员的介绍',
  `intro_detail` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '自我介绍详情：存的是html文本',
  `order_num` int(11) NULL DEFAULT 0 COMMENT '排序：0，1，2，3，4.....，数越大越靠后',
  `create_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '创建时间：由服务端生成',
  `update_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '修改时间：由服务端生成',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '关于我：存放管理员的自我介绍，html文本' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_system_contact_way
-- ----------------------------
DROP TABLE IF EXISTS `t_system_contact_way`;
CREATE TABLE `t_system_contact_way`  (
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键：唯一uuid，由服务端生成',
  `contact_way` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '联系方式：QQ群、QQ号、邮箱等，输入的是名字',
  `way_num` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '联系方式编号：597985642@qq.com、输入的是对应联系方式的内容',
  `way_icon_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '联系方式图标名：svg图标的名字',
  `icon_color` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图标颜色：',
  `link_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '链接地址：掘金地址、哔哩哔哩主页地址等等',
  `is_show` int(11) NULL DEFAULT 1 COMMENT '是否展示在前台：1，展示；2，不展示',
  `order_num` int(11) NULL DEFAULT 0 COMMENT '排序：0，1，2，3，4.....，数越大越靠后',
  `create_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '创建时间：由服务端生成',
  `update_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '修改时间：由服务端生成',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '联系方式：前台关注我们展示的内容，存储拥有者的各类联系方式' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_system_friend_link
-- ----------------------------
DROP TABLE IF EXISTS `t_system_friend_link`;
CREATE TABLE `t_system_friend_link`  (
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键：唯一uuid，由服务端生成',
  `link_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '友链名：友链名字',
  `link_intro` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '友链简介：',
  `link_address` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '友链地址：',
  `link_email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '站长邮箱：',
  `is_publish` int(11) NULL DEFAULT 1 COMMENT '发布状态：1，发布；2，下架',
  `order_num` int(11) NULL DEFAULT 0 COMMENT '排序：0，1，2，3，4.....，数越大越靠后',
  `create_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '创建时间：由服务端生成',
  `update_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '修改时间：由服务端生成',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '友情链接' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_web_user
-- ----------------------------
DROP TABLE IF EXISTS `t_web_user`;
CREATE TABLE `t_web_user`  (
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键：唯一uuid，由服务端生成',
  `user_tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '手机号：用户的手机号',
  `user_profile` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '头像：用户头像地址',
  `user_wechat` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '微信号：用户的微信',
  `user_microblog` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '新郎微博：用户的微博',
  `user_gitee` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT 'Gitee：用户的gitee账号',
  `user_github` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT 'GitHub：用户的GitHub账号',
  `user_qq` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT 'QQ：用户的qq账号',
  `user_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '邮箱：',
  `user_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '登录密码：用户的登录密码',
  `nick_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '昵称：用户昵称',
  `user_position` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '职位：用户职位',
  `user_company` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '公司：用户公司',
  `user_website` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '个人主页：用户个人主页',
  `user_intro` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '个人简介：用户个人简介',
  `gender` int(11) NULL DEFAULT 1 COMMENT '性别：1，男；2，女',
  `user_identity` int(11) NULL DEFAULT 1 COMMENT '用户身份：用来标识用户身份，在评论的时候展示，默认是1，普通用户；-1，小陈；-2，小噗哧；',
  `login_ip_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '登录IP：用户最近一次登录的ip地址',
  `last_login_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '最后登录时间：用户最后一次登录的时间',
  `account_status` int(11) NULL DEFAULT 1 COMMENT '账号状态：1，正常；2，禁言；3，禁止修改资料；4，封停；',
  `data_audit_status` int(11) NULL DEFAULT 1 COMMENT '资料审核状态：1，审核通过；2，审核中；3，驳回；',
  `account_source` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '账号来源：Gitee、Github、Microblog、QQ',
  `order_num` int(11) NULL DEFAULT 0 COMMENT '排序：0，1，2，3，4.....，数越大越靠后',
  `create_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '创建时间：由服务端生成',
  `update_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '修改时间：由服务端生成',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '前台用户：存放登录后的用户们的个人信息' ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;

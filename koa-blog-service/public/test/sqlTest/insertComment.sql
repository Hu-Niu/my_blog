-- 一级评论
insert into t_comments
(uid,comment_content,comment_source,source_id,comment_person_id,comment_layer,create_time,update_time)
values
('aaa','一级评论1 cheny',1,-1,'99304890-146a-11ec-8f9c-d7eddd69ac3a',1,now(),now())

insert into t_comments
(uid,comment_content,comment_source,source_id,comment_person_id,comment_layer,create_time,update_time)
values
('bbb','一级评论2 xzz',1,-1,'99304890-146a-11ec-8f9c-d7eddd69ac3b',1,now(),now())

insert into t_comments
(uid,comment_content,comment_source,source_id,comment_person_id,comment_layer,create_time,update_time)
values
('ccc','一级评论3 cheny',1,-1,'99304890-146a-11ec-8f9c-d7eddd69ac3a',1,now(),now())

insert into t_comments
(uid,comment_content,comment_source,source_id,comment_person_id,comment_layer,create_time,update_time)
values
('ddd','一级评论4 xzz',1,-1,'99304890-146a-11ec-8f9c-d7eddd69ac3b',1,now(),now())

insert into t_comments
(uid,comment_content,comment_source,source_id,comment_person_id,comment_layer,create_time,update_time)
values
('eee','一级评论5 路人',1,-1,'87a4e1c0-1821-11ec-8555-f57ea5e8dd54',1,now(),now())

-- 二级评论
-- xzz回复cheny
insert into t_comments
(uid,comment_content,comment_source,source_id,comment_person_id,commented_person_id,to_comment_id,root_comment_id,comment_layer,create_time,update_time)
values
(uuid(),'二级评论3 xzz',1,-1,'99304890-146a-11ec-8f9c-d7eddd69ac3b','99304890-146a-11ec-8f9c-d7eddd69ac3a','aaa','aaa',2,now(),now())

-- 三级评论
-- cheny回复xzz
insert into t_comments
(uid,comment_content,comment_source,source_id,comment_person_id,commented_person_id,to_comment_id,root_comment_id,comment_layer,create_time,update_time)
values
(uuid(),'三级评论2 cheny',1,-1,'99304890-146a-11ec-8f9c-d7eddd69ac3a','99304890-146a-11ec-8f9c-d7eddd69ac3b','d1eb89be-1788-11ec-9d4c-b06ebf5f2d71','aaa',3,now(),now())

-- 四级评论
-- xzz回复cheny
insert into t_comments
(uid,comment_content,comment_source,source_id,comment_person_id,commented_person_id,to_comment_id,root_comment_id,comment_layer,create_time,update_time)
values
(uuid(),'四级评论3 xzz',1,-1,'99304890-146a-11ec-8f9c-d7eddd69ac3b','99304890-146a-11ec-8f9c-d7eddd69ac3a','eae65ab2-1788-11ec-9d4c-b06ebf5f2d71','aaa',4,now(),now())

-- 五级评论
-- cheny回复xzz
insert into t_comments
(uid,comment_content,comment_source,source_id,comment_person_id,commented_person_id,to_comment_id,root_comment_id,comment_layer,create_time,update_time)
values
(uuid(),'五级评论10 cheny',1,-1,'99304890-146a-11ec-8f9c-d7eddd69ac3a','99304890-146a-11ec-8f9c-d7eddd69ac3b','1201d5f1-1789-11ec-9d4c-b06ebf5f2d71','aaa',5,now(),now())





    select 
        a.*,
				b.user_profile as comment_person_profile,
				c.user_profile as commented_person_profile
    from 
        t_comments as a
		left join
				t_web_user as b
		on a.comment_person_id = b.uid
		left join
				t_web_user as c
		on a.commented_person_id = c.uid
    where 
        a.comment_content like '%'
        and a.comment_source like '1'
        and a.source_id like '-1'
        and a.comment_status like '%'
        and a.comment_person_id like '%'
        and a.commented_person_id like '%'
        and a.to_comment_id like '%'
        and a.root_comment_id like '%'
        and a.order_num like '%'
    order by 
        a.order_num,a.create_time desc

select now()

/*
	找到留言板下面的所有根留言
	增加一个临时的字段tempRoot，待会好根据这个字段分组，把一组的留言排列在一起
*/
select
		a.uid as tempRoot,
		a.uid,
		a.comment_content,
		a.create_time
from 
		t_comments as a
where 
		a.comment_source like '1'
		and a.source_id like '-1'
		and a.root_comment_id = ''
-- 联合查询，找到所有根下的留言
select
		a.root_comment_id as tempRoot,
		a.uid,
		a.comment_content,
		a.create_time
from 
		t_comments as a
where
		a.root_comment_id in
		(
			select
					a.uid
			from 
					t_comments as a
			where 
					a.comment_source like '1'
					and a.source_id like '-1'
					and a.root_comment_id = ''
			order by a.create_time desc
		)
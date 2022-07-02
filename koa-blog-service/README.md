```sql
delete from t_admin_user where uid = '-1';
insert into t_admin_user( uid, user_name, user_password, order_num, create_time, update_time ) values ('-1','admin','$2a$10$2veC0JLAmmOavUlyyDN25.3vRix0nyH9Vf5lAcI8DRyQgKGnQBKVG',-1,localtime(),localtime());
```

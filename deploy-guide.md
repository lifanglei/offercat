所需的组件：Nginx,Postgresql,Django,gunicorn,virtualenv,React,npm,
推荐python3以免中文编码问题

参考资料:[DgitialOcean Blog](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04)
1.安装Nginx,Postgresql:
	​```bash
	$ sudo apt-get update
	$ sudo apt-get install python3-pip python3-dev libpq-dev postgresql postgresql-contrib nginx virtualenv nodejs npm
	```

2.创建数据库和新用户/相关命令：
	​```bash
	$ sudo -u postgres psql
	postgres=# CREATE DATABASE myproject;
	postgres=# CREATE USER myprojectuser WITH PASSWORD 'password';
	postgres=# ALTER ROLE myprojectuser SET client_encoding TO 'utf8';
	postgres=# ALTER ROLE myprojectuser SET default_transaction_isolation TO 'read committed';
	postgres=# ALTER ROLE myprojectuser SET timezone TO 'UTC';
	postgres=# GRANT ALL PRIVILEGES ON DATABASE myproject TO myprojectuser;

	​```

3.创建Django settings.py和config.py：
	根据所创建的数据库名，新用户，用户密码修改settings.py(参照样例settings.py,config.py)
	修改DEBUG值
	修改ALLOWED_HOSTS

4.创建venv以及安装依赖/相关命令：
	​```bash
	$ virtualenv -p python3 venv
	$ source venv/bin/activate
	$ pip install -r requirements.txt
	​```

5.初始化数据库：
	`$ ./manage.py makemigrations accounts`
	`$ ./manage.py makemigrations functions`
	因为functions和hire应用存在相互依赖，此时需要先注释掉hire/models.py里class position中的collections和lauds字段
	`$ ./manage.py makemigrations hire`
	`$ ./manage.py makemigrations profiles`
	`$ ./manage.py migrate`
	取消之前的注释
	`$ ./manage.py makemigrations hire`
	`$ ./manage.py migtate`
	运行Django检查数据库初始化是否正确

6.安装Recat,编译前端组件并准备media文件：
	进入my-app目录
	`$ npm install`
	`$ npm run build`
	返回officeCat目录
	根据settings.py中的STATIC_ROOT的值创建statics文件
	`$ ./manage.py collectstatic`


7.创建并启动gunicorn服务
	创建/etc/systemd/systemd/gunicorn.target
	​``` 
	[Unit]
	Description=Gunicorn
	Documentation=https://example.com/path/to/your/docs
	[Install]
	WantedBy=multi-user.target
	​```
	创建/etc/systemd/systemd/gunicorn@officeCat.service (参考gunicorn@officeCat.service)

8.创建并运行Nginx服务
	创建/etc/nginx/sites-enable/officeCat (参考officeCat_ngixn.conf)

9.访问ip：port检查部署是否成功

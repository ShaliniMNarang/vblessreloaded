pipeline {
    agent any
    
    parameters {
        string(name: 'app', defaultValue: 'vblessimg/vbless', description: 'docker app name')
    }

    stages {
        stage('Build') {
            steps {
                sh 'mvn install dockerfile:build'
            }
        }
        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                pwd
                echo $jdbc_user_name;
                dockerProcess=`docker ps|grep $app|awk \'{print $1}\'`;
				if [ -n "$dockerProcess" ]
				then
					docker stop $dockerProcess	
					echo "docker process "$dockerProcess" stopped"
				fi
				docker run -p 6565:8080 -t $app docker run -p 5050:8080 -t vblessimg/vbless  --spring.datasource.url=$jdbc_url --spring.datasource.username=$jdbc_user_name --spring.datasource.password=$jdbc_password --email.userName=$email_userName  --email.password=$email_password &
                '''
            }
        }
    }
}

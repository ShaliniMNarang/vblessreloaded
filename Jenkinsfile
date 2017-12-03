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
                env
                echo $GOOGLE_APPLICATION_CREDENTIALS;
                echo $JDBC_URL;
                echo $JDBC_USER_NAME;
                echo 11;
                dockerProcess=`docker ps|grep $app|awk \'{print $1}\'`;
				if [ -n "$dockerProcess" ]
				then
					docker stop $dockerProcess	
					echo "docker process "$dockerProcess" stopped"
				fi
				docker run -p 6565:8080 -t $app docker run -p 5050:8080 -t vblessimg/vbless  --spring.datasource.url=$JDBC_URL --spring.datasource.username=$JDBC_USER_NAME --spring.datasource.password=$JDBC_PASSWORD --email.userName=$EMAIL_USERNAME  --email.password=$EMAIL_PASSWORD &
                '''
            }
        }
    }
}

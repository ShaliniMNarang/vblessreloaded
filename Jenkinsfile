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
                echo 22;
                dockerProcess=`docker ps|grep $app|awk \'{print $1}\'`;
				if [ -n "$dockerProcess" ]
				then
					docker stop $dockerProcess	
					echo "docker process "$dockerProcess" stopped"
				fi
				/Users/chidanandapati/spring/vbless.sh
                '''
            }
        }
    }
}

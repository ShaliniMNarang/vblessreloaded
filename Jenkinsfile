pipeline {
    agent any
    
    parameters {
        string(name: 'app', defaultValue: 'vblessimg/vbless', description: 'vbless docker image')
    }

    stages {
        stage('Build') {
            steps {
            		sh '''
                 mvn package dockerfile:build -DskipTests;
                 '''
            }
        }
        stage('Test') {
            steps {
                sh '''
                mvn test
                '''
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                ls
                pwd
                dockerProcess=`docker ps|grep "5051.*8080"|awk \'{print $1}\'`;
                echo $dockerProcess
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

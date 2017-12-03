pipeline {
    agent any
    
    parameters {
        string(name: 'app', defaultValue: 'vblessimg/vbless', description: 'docker app name')
    }

    stages {
        stage('Build') {
            steps {
            		sh '''
            		dockerProcess=`docker ps|grep $app|awk \'{print $1}\'`;
            		export dockerProcess;
                 mvn install dockerfile:build;
                 '''
            }
        }
        stage('Test') {
            steps {
                sh '''
                echo $dockerProcess
                mvn test
                '''
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                ls
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

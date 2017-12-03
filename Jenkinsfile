pipeline {
    agent any
    
    parameters {
        string(name: 'app', defaultValue: 'vblessimg/vbless', description: 'docker app name')
    }

    stages {
        stage('Build') {
            steps {
            		dockerProcess=`docker ps|grep $app|awk \'{print $1}\'`;
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

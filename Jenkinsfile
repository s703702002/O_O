pipeline {
    agent {
        docker {
            image 'node:10.15.3-alpine' 
            args '-p 8888:80 -u root:root' 
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deliver') { 
            steps {
                sh 'npm run production'
                sh './deliver.sh'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh 'echo $(cat .pidfile) && kill $(cat .pidfile)'
            }
        }
    }
}
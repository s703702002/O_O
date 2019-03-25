pipeline {
    agent {
        docker {
            image 'node:10.15.3-alpine' 
            args '-p 80:80' 
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
                sh 'echo Deliver'
            }
        }
    }
}
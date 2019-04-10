pipeline {
    agent {
        docker {
            image 'node:10.15.3-alpine' 
            args '-u ec2-user --rm' 
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
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh 'echo "Deliver success!"'
            }
        }
        stage('delete files from workspace') {
            steps {
                sh 'ls -l'
                // sh 'sudo rm -rf ./*'
            }
        }
    }
}
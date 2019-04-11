pipeline {
    agent { 
        docker { 
            image 'node:10.15.3'
            args '-v jenkins-data:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -v "$HOME":/home'
        }
    }
    environment {
        HOME = '.'
        CI = 'true' 
    }
    stages {
        stage('build') {
            steps {
                sh 'echo $HOME'
                sh 'npm --version'
                sh 'node -v'
                sh 'npm ci'
                sh 'npm run production'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run lint'
                sh 'npm test'
            }
        }
    }
    post { 
        always {
            echo 'I will always say Hello again!'
            sh 'docker images'
        }
    }
}
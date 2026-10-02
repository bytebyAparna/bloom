pipeline {
    agent any
    stages {
        stage('Clone Code') {
            steps {
                echo 'Cloning from GitHub...'
                checkout scm
            }
        }
        stage('Build Docker Images') {
            steps {
                bat 'docker-compose build'
            }
        }
        stage('Test') {
            steps {
                echo 'Build successful - images ready'
                bat 'docker images'
            }
        }
    }
}
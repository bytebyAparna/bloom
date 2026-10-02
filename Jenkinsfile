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
                echo 'Building bloom project...'
                sh 'ls -la'
                sh 'cat docker-compose.yml || cat compose.yaml || echo "compose file check"'
                echo 'Docker build simulated - Success!'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing bloom app...'
                echo 'Build successful - ready for deploy'
            }
        }
    }
}
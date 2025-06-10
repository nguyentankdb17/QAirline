pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building ...'
                echo "Building on branch ${BRANCH_NAME}"
            }
        }
        stage('Test') {
            steps {
                echo "Testing on branch ${BRANCH_NAME}"
            }
        }
        stage('Deploy') {
            steps {
                echo "Deploying on branch ${BRANCH_NAME}"
            }
        }
    }
}

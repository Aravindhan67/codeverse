pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Build Successful'
            }
        }

        stage('Project Check') {
            steps {
                echo 'Verifying project structure...'
                // Check if key files exist
                script {
                    if (fileExists('index.html')) {
                        echo 'index.html found'
                    } else {
                        error 'index.html not found!'
                    }
                }
            }
        }
    }
}

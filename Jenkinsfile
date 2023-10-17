pipeline {
    agent any 

    environment {
        DOCKER_REGISTRY = "3.39.247.107:31500"
        APP_NAME = "interface"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo "Webhook Test: Code has been checked out."
            }
        }

	stage('Execute Test') {
	    steps {
		sh "npm test"
	    }
	}

        stage('Build Docker Image') {
            steps {
                sh "sudo docker build -t ${DOCKER_REGISTRY}/${APP_NAME}:latest ."
            }
        }

        stage('Push Docker Image') {
            steps {
                sh "sudo docker push ${DOCKER_REGISTRY}/${APP_NAME}:latest"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'kubernetes-config', variable: 'KUBECONFIG_PATH')]) {
                        sh '''
                            export KUBECONFIG=${KUBECONFIG_PATH}
                            kubectl apply -f deploy/deploy.yaml
                        '''
                    }
                }
            }
        }
    }
}


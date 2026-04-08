# Use a stable OpenJDK 21 image
FROM eclipse-temurin:21-jdk

# Set working directory inside the container
WORKDIR /app

# Copy all project files into the container
COPY . .

# Make Maven wrapper executable
RUN chmod +x mvnw

# Build the project
RUN ./mvnw clean install -DskipTests

# Expose port 8080 for Spring Boot
EXPOSE 10000

# Run the Spring Boot application
CMD ["java", "-jar", "target/SecureOnlineExamSystem-0.0.1-SNAPSHOT.jar"]
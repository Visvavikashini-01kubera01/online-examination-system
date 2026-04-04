# Use official OpenJDK 17 slim image
FROM openjdk:17-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Copy src folder
COPY src src

# Make mvnw executable
RUN chmod +x mvnw

# Build the Spring Boot app (skip tests to save time)
RUN ./mvnw clean package -DskipTests

# Expose the port your Spring Boot app runs on
EXPOSE 8080

# Run the built jar
CMD ["java", "-jar", "target/SecureOnlineExamSystem-0.0.1-SNAPSHOT.jar"]
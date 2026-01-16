import CourseCategorySection from "./CourseCategorySection";
import CourseCard from "./CourseCard";
import data from "@/data/courses.json"


const OurCourses = () => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Our Courses
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our comprehensive course offerings
          </p>
        </div>

        {/* Course Categories */}
        <div>
          {data.map((category, categoryIndex) => {
            let courseIndex = 0;
            return (
              <CourseCategorySection key={category.id} categoryName={category.category}>
                {category.courses.map((course) => {
                  const currentIndex = courseIndex++;
                  return (
                    <CourseCard
                      key={course.id}
                      id={course.id}
                      imageSrc={`/${course.imageSrc}`}
                      title={course.title}
                      duration={course.duration}
                      rating={course.rating}
                      reviews={course.reviews}
                      students={course.students}
                      originalPrice={course.originalPrice}
                      discount={course.discount}
                      discountedPrice={course.discountedPrice}
                      index={currentIndex}
                    />
                  );
                })}
              </CourseCategorySection>
            );
          })}

          {/* <CourseCategorySection categoryName="Graphic Design">
            <CourseCard
              imageSrc={courseCard1}
              title="Basic Graphics Design"
              duration="30 Hours"
              rating={4.3}
              reviews={498}
              students={1985}
              originalPrice="৳15,000"
              discount={50}
              discountedPrice="৳7,500"
            />

            <CourseCard
              imageSrc={courseCard2}
              title="Master of Graphics Design"
              duration="90 Hours"
              rating={4}
              reviews={498}
              students={1985}
              originalPrice="৳30,000"
              discount={50}
              discountedPrice="৳15,000"
            />
            <CourseCard
              imageSrc={courseCard3}
              title="Professional Graphics Design"
              duration="60 Hours"
              rating={3}
              reviews={498}
              students={1985}
              originalPrice="৳20,000"
              discount={50}
              discountedPrice="৳10,000"
            />
          </CourseCategorySection>

          <CourseCategorySection categoryName="Web design & development">
            <CourseCard
              imageSrc={courseCard4}
              title="Professional Web Design & Development"
              duration="80 Hours"
              rating={4}
              reviews={498}
              students={1985}
              originalPrice="৳60,000"
              discount={50}
              discountedPrice="৳30,000"
            />
            <CourseCard
              imageSrc={courseCard5}
              title="Front-end Development with React"
              duration="60 Hours"
              rating={3}
              reviews={498}
              students={1985}
              originalPrice="৳40,000"
              discount={50}
              discountedPrice="৳20,000"
            />

          </CourseCategorySection>

          <CourseCategorySection categoryName="Office Course">
            <CourseCard
              imageSrc={courseCard6}
              title="Advanced Excel"
              duration="20 Hours"
              rating={4}
              reviews={498}
              students={1985}
              originalPrice="৳6,000"
              discount={50}
              discountedPrice="৳3,000"
            />
            <CourseCard
              imageSrc={courseCard7}
              title="Professional Office Management"
              duration="60 Hours"
              rating={4}
              reviews={498}
              students={1985}
              originalPrice="৳10,000"
              discount={50}
              discountedPrice="৳5,000"
            />
            <CourseCard
              imageSrc={courseCard8}
              title="Certificate in Computer Science & Application"
              duration="40 Hours"
              rating={4}
              reviews={498}
              students={1985}
              originalPrice="৳6,000"
              discount={50}
              discountedPrice="৳3,000"
            />
            
          </CourseCategorySection>
          <CourseCategorySection categoryName="Video Editing">
            <CourseCard
              imageSrc={courseCard9}
              title="Professional Video Editing"
              duration="50 Hours"
              rating={4}
              reviews={498}
              students={1985}
              originalPrice="৳40,000"
              discount={50}
              discountedPrice="৳20,000"
            />
           
          </CourseCategorySection>
          <CourseCategorySection categoryName="Hardware">
            <CourseCard
              title="Basic Hardware"
              duration="30 Hours"
              rating={4}
              reviews={498}
              students={1985}
              originalPrice="৳15,000"
              discount={50}
              discountedPrice="৳7,500"
            />
           
          </CourseCategorySection>
          <CourseCategorySection categoryName="Professional Digital Marketing">
            <CourseCard
              title="Basic Professional Digital Marketing"
              duration="30 Hours"
              rating={4}
              reviews={498}
              students={1985}
              originalPrice="৳15,000"
              discount={50}
              discountedPrice="৳7,500"
            />
           
          </CourseCategorySection>
          <CourseCategorySection categoryName="Professional Freelancing & Outsourcing">
            <CourseCard
              title="Basic Office Course"
              duration="30 Hours"
              rating={4}
              reviews={498}
              students={1985}
              originalPrice="৳15,000"
              discount={50}
              discountedPrice="৳7,500"
            />
           
          </CourseCategorySection>
          <CourseCategorySection categoryName="Office Course">
            <CourseCard
              title="Basic Office Course"
              duration="30 Hours"
              rating={4}
              reviews={498}
              students={1985}
              originalPrice="৳15,000"
              discount={50}
              discountedPrice="৳7,500"
            />
           
          </CourseCategorySection>
          <CourseCategorySection categoryName="Office Course">
            <CourseCard
              title="Basic Office Course"
              duration="30 Hours"
              rating={4}
              reviews={498}
              students={1985}
              originalPrice="৳15,000"
              discount={50}
              discountedPrice="৳7,500"
            />
           
          </CourseCategorySection> */}

          {/* You can add more CourseCategorySection components here */}
        </div>
      </div>
    </section>
  );
};

export default OurCourses;
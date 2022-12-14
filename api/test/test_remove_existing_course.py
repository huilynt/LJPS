import unittest
import flask_testing
from app import app, db
from models import LearningJourney, Course, LearningJourney_SelectedCourse, Staff, JobRole, Role


class TestApp(flask_testing.TestCase):
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite://"
    app.config['TESTING'] = True

    def create_app(self):
        return app

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()


class RemoveExistingCourse(TestApp):

    def test_existing_course_not_found(self):
        role = Role(1, "Admin")
        staff = Staff(140525, 'John', 'Sim', 'Chariman', 'jack.sim@allinone.com.sg', 1)
        jobrole = JobRole('EN002', 'DevOps Engineer', 'It is an IT generalist who should have a wide-ranging knowledge of both development and operations, including coding and infrastructure management.')
        course1 = Course('FIN003',
                            'Business Continuity Planning',
                            'Business continuity planning is essential in any business to minimise loss when faced with potential threats and disruptions.',
                            'Active', 'External', 'Finance')
        course2 = Course('COR006',
                            'Manage Change',
                            'Identify risks associated with change and develop risk mitigation plans.',
                            'Active', 'External', 'Core')
        course3 = Course('COR002',
                            'Lean Six Sigma Green Belt Certification',
                            'Apply Lean Six Sigma methodology and statistical tools such as Minitab to be used in process analytics',
                            'Active', 'Internal', 'Core')
        lj_obj = LearningJourney("EN002-140525", "EN002", 140525, 'Progress')
        db.session.add(role)
        db.session.add(staff)
        db.session.add(course1)
        db.session.add(course2)
        db.session.add(course3)
        db.session.add(jobrole)
        db.session.commit()
        db.session.add(lj_obj)
        db.session.commit()

        lj_course1 = LearningJourney_SelectedCourse.insert().values(Journey_ID='EN002-140525', Course_ID='COR002')
        lj_course2 = LearningJourney_SelectedCourse.insert().values(Journey_ID='EN002-140525', Course_ID='COR006')
        db.engine.execute(lj_course1)
        db.engine.execute(lj_course2)

        response = self.client.delete("/journey/EN002-140525/tch008")
        self.assertEqual(response.json,  {
            "code": 404,
            "data": {
                "journeyId": 'EN002-140525',
                "courseId": 'tch008'
            },
            "message": "Course in selected Learning Journey not found"
        })

    def test_at_least_one_course(self):
        role = Role(1, "Admin")
        staff = Staff(130001, 'John', 'Sim', 'Chariman', 'jack.sim@allinone.com.sg', 1)
        jobrole = JobRole('EN001', 'DevOps Engineer', 'It is an IT generalist who should have a wide-ranging knowledge of both development and operations, including coding and infrastructure management.')
        lj_obj = LearningJourney("EN001-130001", "EN001", 130001, 'Progress')
        course = Course('COR001',
                            'Systems Thinking and Design',
                            'This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking',
                            'Active', 'Internal', 'Core')

        db.session.add(jobrole)
        db.session.add(role)
        db.session.add(staff)
        db.session.add(course)
        db.session.commit()
        db.session.add(lj_obj)
        db.session.commit()

        lj_course = LearningJourney_SelectedCourse.insert().values(Journey_ID='EN001-130001', Course_ID='COR001')
        db.engine.execute(lj_course)

        response = self.client.delete("/journey/EN001-130001/COR001")
        self.assertEqual(response.json, {
                                        "code": 200,
                                        "message": "Only one course left"
                                    })

    def test_remove_existing_course(self):
        role = Role(1, "Admin")
        staff = Staff(140525, 'John', 'Sim', 'Chariman', 'jack.sim@allinone.com.sg', 1)
        jobrole = JobRole('EN002', 'DevOps Engineer', 'It is an IT generalist who should have a wide-ranging knowledge of both development and operations, including coding and infrastructure management.')
        lj_obj = LearningJourney("EN002-140525", "EN002", '140525', 'Progress')
        course1 = Course('COR002',
                            'Lean Six Sigma Green Belt Certification',
                            'Apply Lean Six Sigma methodology and statistical tools such as Minitab to be used in process analytics',
                            'Active', 'Internal', 'Core')
        course2 = Course('COR006',
                            'Manage Change',
                            'Identify risks associated with change and develop risk mitigation plans.',
                            'Active', 'External', 'Core')
        db.session.add(jobrole)
        db.session.add(role)
        db.session.add(staff)
        db.session.add(course1)
        db.session.add(course2)
        db.session.commit()
        db.session.add(lj_obj)
        db.session.commit()

        lj_course1 = LearningJourney_SelectedCourse.insert().values(Journey_ID='EN002-140525', Course_ID='COR002')
        lj_course2 = LearningJourney_SelectedCourse.insert().values(Journey_ID='EN002-140525', Course_ID='COR006')
        db.engine.execute(lj_course1)
        db.engine.execute(lj_course2)

        response = self.client.delete("/journey/EN002-140525/COR002")
        self.assertEqual(response.json, {
                                        "code": 200,
                                        "message": "Delete success"
                                    })


if __name__ == '__main__':
    unittest.main()

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, JSON, TIMESTAMP

Base = declarative_base()


class Intents(Base):
    __tablename__ = 'intents'
    id = Column(Integer, primary_key=True)
    intent = Column(String)
    entities = Column(String)
    contents = Column(JSON)
    answer_type = Column(String)
    api_name = Column(String)

    def __repr__(self):
        return "<Intents(intent='{}', entities='{}', contents='{}', answer_type={}, api_name={})>" \
            .format(self.intent, self.entities, self.contents, self.answer_type, self.api_name)


class Conversations(Base):
    __tablename__ = 'conversations'
    id = Column(Integer, primary_key=True)
    session_id = Column(String)
    feedback = Column(String)
    grading = Column(Integer)

    def __repr__(self):
        return "<Conversations(session_id='{}', feedback='{}', grading='{}')>" \
            .format(self.session_id, self.feedback, self.grading)


class SessionLog(Base):
    __tablename__ = 'session_log'
    id = Column(Integer, primary_key=True)
    session_id = Column(String)
    expression = Column(String)
    intent_id = Column(Integer)
    answer = Column(JSON)
    created_date = Column(TIMESTAMP)

    def __repr__(self):
        return "<Intents(id='{}', session_id='{}', expression='{}', intent_id={}, " \
               "answer={}, created_date={})>" \
            .format(self.id, self.session_id, self.expression, self.intent_id,
                    self.answer, self.created_date)

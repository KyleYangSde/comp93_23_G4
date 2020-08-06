from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from bot.entity import Intents, Conversations, SessionLog

DATABASE_URI = 'postgres+psycopg2://chatbot:chatbot@3.19.60.167:5432/chatbot'

engine = create_engine(DATABASE_URI)
Session = sessionmaker(bind=engine)


def query_intent(intent_name):
    s = Session()
    query = s.query(Intents).filter(Intents.intent == intent_name)
    r = query.first()
    # print(r)
    s.close()
    return r


def add_conversation(session_id, feedback=None, grading=None):
    c = Conversations(
        session_id=session_id,
        feedback=feedback,
        grading=grading
    )
    s = Session()
    s.add(c)
    s.commit()
    # s.refresh(c)
    # print("Added conversation id: %d" % c.id)
    s.close()
    return c


def add_session_log(log):
    s = Session()
    s.add(log)
    s.commit()
    s.close()
    return log


def query_session_log(session_id):
    s = Session()
    r = s.query(SessionLog)\
        .filter(SessionLog.session_id == session_id)\
        .order_by(SessionLog.id.desc())\
        .first()
    # print(r)
    s.close()
    return r




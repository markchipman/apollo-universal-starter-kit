package graphql.resolver

import akka.http.scaladsl.model.Multipart.FormData
import akka.stream.scaladsl.Source
import models._

import scala.concurrent.Future

trait ChatResolver {

  def addMessage(input: AddMessageInput, parts: Source[FormData.BodyPart, Any]): Future[Message]

  def editMessage(input: EditMessageInput): Future[Message]

  def deleteMessage(id: Int): Future[Option[Message]]

  def messages(limit: Int, after: Int): Future[Option[Messages]]

  def message(id: Int): Future[Option[Message]]

  def findQuotedMessage(id: Int): Future[Option[QuotedMessage]]
}

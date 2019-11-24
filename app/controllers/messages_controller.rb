class MessagesController < ApplicationController
  # protect_from_forgery except: :message_params
  
  def index
    @group = Group.find(params[:group_id])
    @message = Message.new
    @messages = @group.messages.includes(:user)
    @users = @group.users
  end

  def create
    @group = Group.find(params[:group_id])
    @message = @group.messages.new(message_params)   
    if @message.save
      #flash[:notice] = "メッセージ登録しました"
      respond_to do |format|
        format.html{ redirect_to group_messages_path(@group) }
        format.json        
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = "メッセージを入力してください"
      render :index
    end
  end
  

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end
  
end

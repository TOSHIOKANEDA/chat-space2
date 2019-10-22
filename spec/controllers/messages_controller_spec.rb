require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do

    describe '保存確認' do
      it 'コンテントだけ保存できます' do
        expect(build(:message, image: nil)).to be_valid
      end
    
    
      it 'イメージだけ保存できます' do
        expect(build(:message, content: nil)).to be_valid
      end

      it '両方ちゃんと保存できます' do
        expect(build(:message, content: nil)).to be_valid
      end
    end


    describe '保存できませんの確認' do
      it '両方なしは保存できません' do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include('を入力してください')
      end

      it 'userなしは保存できません' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include('を入力してください')
      end
    
      it 'groupなしは保存できません' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include('を入力してください')
      end
    
 
    end

  end
end


describe MessagesController do
  let(:user){ create(:user) }
  let(:group){ create(:group) }

  describe "#index" do
    context "ログイン済みの場合" do
      before do
        login_user user
        get :index, params: {group_id: group.id}
      end

      it "assigns @message" do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end

      it "サインインしたあと、ちゃんと#indexのviewを表示させてるか" do
      expect(response).to render_template :index
      end

    end


    context "ログインしていなかった場合" do
      before do
        get :index, params: {group_id: group.id}
      end

      it 'リダイレク先の設定が、正しく設定されているか。redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end

    end
  end


  describe "#create" do
  let(:params) { { group_id: group.id, user_id: user.id, 
  message: attributes_for(:message) } }
    context "ログインしている場合 (params: paramは、letのparamsをパラメーターに渡してる)" do
      before do
        login_user user
      end

      context "保存できます" do
        subject {post :create, params: params}

        it 'メッセージの保存できているか（レコード数が１つ増えたかどうかで判定）' do
          expect{ subject }.to change(Message, :count).by(1)
        end
      

        it 'リダイレクト先の設定確認。redirects to group_messages_path' do
          post :create, params: params
          expect(response).to redirect_to(group_messages_path(group))
        end
      end
    

      context "保存できない (params: paramは、letのinvalid_paramsをパラメーターに渡してる)" do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, 
        message: attributes_for(:message, content: nil, image: nil) } }

        subject {post :create, params: invalid_params }

        it 'メッセージの保存できているか（エラーするので、レコード数が１つ増えないことで判定）' do
          expect{ subject }.not_to change(Message, :count)
        end 
      end
    end

    context "ログインしていない場合" do
      
      it 'メッセージ保存できているか（ログインしていないので、ログイン画面にいく）' do
      post :create, params: params
      expect(response).to redirect_to(new_user_session_path)
      end
    
    end

  end
end